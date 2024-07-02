package database

import (
	"fmt"
	"log"
	"math"
	"os"
	"time"

	"chess-alpha/server/adapter/database/model"
	"chess-alpha/server/config"

	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormLogger "gorm.io/gorm/logger"
)

func NewMySQLDB(logger *zap.Logger, isLogging bool) (*gorm.DB, error) {
	dsn := config.DSN()

	gormConfig := &gorm.Config{}
	if !isLogging {
		gormConfig.Logger = gormLogger.Default.LogMode(gormLogger.Silent)
	} else {
		newLogger := gormLogger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
			gormLogger.Config{
				SlowThreshold: time.Duration(config.SlowQueryThresholdMilliSecond()) * time.Millisecond,
				LogLevel:      gormLogger.Warn,
			},
		)
		gormConfig.Logger = newLogger
	}

	db, err := gorm.Open(mysql.Open(dsn), gormConfig)

	if err != nil {
		return nil, fmt.Errorf("failed to open MySQL: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get sql.DB: %w", err)
	}

	sqlDB.SetConnMaxIdleTime(100)
	sqlDB.SetMaxOpenConns(100)

	// Check connection
	const retryMax = 10
	for i := 0; i < retryMax; i++ {
		err = sqlDB.Ping()
		if err == nil {
			break
		}
		if i == retryMax-1 {
			return nil, fmt.Errorf("failed to connect to database: %w", err)
		}
		duration := time.Millisecond * time.Duration(math.Pow(1.5, float64(i))*1000)
		logger.Warn("failed to connect to database retrying", zap.Error(err), zap.Duration("sleepSeconds", duration))
		time.Sleep(duration)
	}

	return db, nil
}

func Migrate(db *gorm.DB) error {
	if err := db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&model.User{}, &model.Room{}); err != nil {
		return err
	}
	return nil
}

func DropDB(db *gorm.DB) error {
	rows, err := db.Raw("SHOW TABLES").Rows()
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var tableName string
		if err := rows.Scan(&tableName); err != nil {
			return err
		}

		query := fmt.Sprintf("DROP TABLE IF EXISTS %s", tableName)
		if err := db.Exec(query).Error; err != nil {
			return err
		}
	}

	return nil
}
