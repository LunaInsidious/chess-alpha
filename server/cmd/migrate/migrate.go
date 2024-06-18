package main

import (
	"go.uber.org/zap"

	"chess-alpha/server/adapter/database"
	"chess-alpha/server/log"
)

func main() {
	logger, err := log.NewLogger()
	if err != nil {
		return
	}

	db, err := database.NewMySQLDB(logger, true)
	if err != nil {
		logger.Error("db connection error:", zap.Error(err))
	}

	err = database.Migrate(db)
	if err != nil {
		logger.Error("db migration error:", zap.Error(err))
	}
}
