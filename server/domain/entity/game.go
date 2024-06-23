package entity

import (
	"chess-alpha/server/domain/entconst"
	"time"
)

type Game struct {
	GameID     string
	Citizens   []User
	Werewolf   User
	GameRecord string
	Result     entconst.Result
	StartAt    time.Time
	EndAt      *time.Time
}
