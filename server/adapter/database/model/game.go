package model

import (
	"time"

	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/entity"

	"gorm.io/gorm"
)

type Game struct {
	GameID     string     `gorm:"primaryKey;size:30;not null;comment:ゲームID"`
	Citizens   []User     `gorm:"many2many:user_to_games;foreignkey:GameID;joinForeignKey:GameID;References:UserID;joinReferences:UserID;constraint:OnDelete:CASCADE;comment:市民ロールのユーザー"`
	WerewolfID string     `gorm:"not null;comment:人狼ロールのユーザーのID"`
	Werewolf   User       `gorm:"many2many:user_to_games;foreignkey:GameID;joinForeignKey:GameID;References:UserID;joinReferences:UserID;constraint:OnDelete:CASCADE;comment:人狼ロールのユーザー"`
	GameRecord string     `gorm:"not null;comment:FENで記載された盤面"`
	Result     string     `gorm:"size:255;not null;comment:対戦結果"`
	StartAt    time.Time  `gorm:"not null;comment:開始日時"`
	EndAt      *time.Time `gorm:"comment:終了日時"`
	// DeleteAtは初期値がNull
	// gormのDeleteメソッドを呼び出した時は自動でDeleteAtに削除日時が入る
	// レコード取得時はDeletedAtがNullのものだけが取得される
	DeletedAt gorm.DeletedAt `gorm:"comment:削除日時"`
}

func (g Game) Entity() entity.Game {
	return entity.Game{
		GameID:     g.GameID,
		Citizens:   ToEntities(g.Citizens),
		Werewolf:   g.Werewolf.Entity(),
		GameRecord: g.GameRecord,
		Result:     entconst.Result(g.Result),
		StartAt:    g.StartAt,
		EndAt:      g.EndAt,
	}
}
