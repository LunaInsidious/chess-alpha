package database

import (
	"gorm.io/gorm"

	"chess-alpha/server/adapter/database/initdata"
)

func CreateDevSeedData(db *gorm.DB) error {
	if err := CreateUser(db); err != nil {
		return err
	}
	return nil
}

func CreateUser(db *gorm.DB) error {
	users := initdata.User()
	return db.Create(users).Error
}
