package entity

import (
	"time"

	"chess-alpha/server/domain/entconst"
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
