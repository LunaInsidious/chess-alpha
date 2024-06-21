package main

import (
	"fmt"

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
		fmt.Println("error:", err)
	}

	err = database.DropDB(db)
	if err != nil {
		fmt.Println("error:", err)
	}

	err = database.Migrate(db)
	if err != nil {
		fmt.Println("error:", err)
	}

	// 開発用テストデータ作成
	err = database.CreateDevSeedData(db)
	if err != nil {
		fmt.Println("error:", err)
	}
}
