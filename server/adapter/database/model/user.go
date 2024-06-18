package model

import (
	"time"

	"gorm.io/gorm"

	"chess-alpha/server/domain/entity"
)

type User struct {
	UserID         string `gorm:"primaryKey;size:30;not null"`
	LoginID        string `gorm:"unique;not null"`
	Name           string `gorm:"size:255;not null"`
	Rate           int    `gorm:"not null"`
	HashedPassword string `gorm:"size:255;not null"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
	// DeleteAtは初期値がNull
	// gormのDeleteメソッドを呼び出した時は自動でDeleteAtに削除日時が入る
	// レコード取得時はDeletedAtがNullのものだけが取得される
	DeletedAt gorm.DeletedAt
}

func (u *User) Entity() entity.User {
	return entity.User{
		UserID:         u.UserID,
		LoginID:        u.LoginID,
		Name:           u.Name,
		Rate:           u.Rate,
		HashedPassword: u.HashedPassword,
	}
}
