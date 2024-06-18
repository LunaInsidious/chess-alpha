package config

import (
	"fmt"
	"os"
)

func DSN() string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	) + "?charset=utf8mb4&collation=utf8mb4_bin&parseTime=True&loc=Asia%2FTokyo"
}
