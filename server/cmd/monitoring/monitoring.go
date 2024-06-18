package main

import (
	"fmt"
	"os"

	"go.uber.org/zap"

	"chess-alpha/server/adapter/database"
	"chess-alpha/server/log"
	"chess-alpha/server/usecase/interactor"
)

func main() {
	logger, err := log.NewLogger()
	if err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "Failed to create logger : %v\n", err)
		os.Exit(1)
	}

	db, err := database.NewMySQLDB(logger, true)
	if err != nil {
		logger.Error("Failed to connect to database", zap.Error(err))
		return
	}

	defer func() {
		sqlDB, err := db.DB()
		if err != nil {
			logger.Error("Failed to get sql.DB", zap.Error(err))
		}
		err = sqlDB.Close()
		if err != nil {
			logger.Error("Failed to close database connection", zap.Error(err))
		}
	}()

	healthCheckRepo := database.NewHealthCheckRepository(db)
	healthCheckUC := interactor.NewHealthCheckUseCase(healthCheckRepo)
	err = healthCheckUC.CheckDataConsistency()
	if err != nil {
		logger.Error("Failed to monitor consistency", zap.Error(err))
	}
}
