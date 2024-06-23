package model

import (
	"time"

	"gorm.io/gorm"

	"chess-alpha/server/domain/entity"
)

type User struct {
	UserID         string    `gorm:"primaryKey;size:30;not null;comment:ユーザーID"`
	LoginID        string    `gorm:"unique;not null;comment:ログインID"`
	Name           string    `gorm:"size:255;not null;comment:名前"`
	Rate           int       `gorm:"not null;comment:対戦のレート"`
	HashedPassword string    `gorm:"size:255;not null;comment:ハッシュ化されたパスワード"`
	CreatedAt      time.Time `gorm:"not null;comment:作成日時"`
	UpdatedAt      time.Time `gorm:"not null;comment:更新日時"`
	// DeleteAtは初期値がNull
	// gormのDeleteメソッドを呼び出した時は自動でDeleteAtに削除日時が入る
	// レコード取得時はDeletedAtがNullのものだけが取得される
	DeletedAt gorm.DeletedAt `gorm:"comment:削除日時"`
}

func (u User) Entity() entity.User {
	return entity.User{
		UserID:         u.UserID,
		LoginID:        u.LoginID,
		Name:           u.Name,
		Rate:           u.Rate,
		HashedPassword: u.HashedPassword,
	}
}
