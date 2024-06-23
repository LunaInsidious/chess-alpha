package entity

import (
	"time"
)

type Game struct {
	GameID     string
	Citizens   []User
	Werewolf   User
	GameRecord string
	Result     string
	StartAt    time.Time
	EndAt      *time.Time
}
