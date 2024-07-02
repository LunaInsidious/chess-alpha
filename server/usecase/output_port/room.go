package output_port

import "chess-alpha/server/domain/entity"



type RoomRepository interface {
	FindByID(roomID string) (entity.Room, error)
	CreateRoom(room entity.Room) error
	JoinRoom(roomID string, userID string) error
	LeaveRoom(roomID string, userID string) error
}
