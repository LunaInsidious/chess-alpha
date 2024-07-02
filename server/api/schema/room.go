package schema

import "chess-alpha/server/domain/entity"

type RoomRes struct {
	RoomID  string   `json:"roomID"`
	Host    string   `json:"host"`
	Players []string `json:"players"`
	Status  string   `json:"status"`
}

func RoomResFromEntity(room entity.Room) RoomRes {
	return RoomRes{
		RoomID:  room.RoomID,
		Host:    room.Host,
		Players: room.Players,
		Status:  room.Status,
	}
}
