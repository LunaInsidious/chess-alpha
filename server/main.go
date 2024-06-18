package main

import (
	"fmt"
	"os"

	"chess-alpha/server/adapter/clock"
	"chess-alpha/server/config"
	"chess-alpha/server/log"

	"go.uber.org/zap"

	"chess-alpha/server/adapter/authentication"
	"chess-alpha/server/adapter/database"
	"chess-alpha/server/adapter/ulid"
	"chess-alpha/server/api/router"
	"chess-alpha/server/usecase/interactor"
	"chess-alpha/server/usecase/output_port"
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
	transaction := database.NewGormTransaction(db)

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

	var userAuth output_port.UserAuth
	if config.SigKey() == "" {
		userAuth = authentication.NewUserAuthMock()
	} else {
		userAuth = authentication.NewUserAuth()
	}

	clockDriver := clock.New()

	ulidDriver := ulid.NewULID()
	userRepo := database.NewUserRepository(db, ulidDriver)
	healthCheckRepo := database.NewHealthCheckRepository(db)

	userUC := interactor.NewUserUseCase(clockDriver, ulidDriver, transaction, userAuth, userRepo)
	healthCheckUC := interactor.NewHealthCheckUseCase(healthCheckRepo)

	s := router.NewServer(
		userUC,
		healthCheckUC,
		true,
	)

	if err := s.Start(":80"); err != nil {
		logger.Error("Failed to start server", zap.Error(err))
		os.Exit(1)
	}
}
