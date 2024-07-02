package model

import "chess-alpha/server/domain/entity"

type Room struct {
	RoomID  string   `gorm:"primaryKey;size:30;not null"`
	Host    string   `gorm:"size:30;not null"`
	Players []string `gorm:"size:30;not null"`
	Status  string   `gorm:"not null"`
}

func (r Room) Entity() entity.Room {
	return entity.Room{
		RoomID:  r.RoomID,
		Host:    r.Host,
		Players: r.Players,
		Status:  r.Status,
	}
}
