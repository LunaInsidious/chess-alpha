package input_port

import "chess-alpha/server/domain/entity"

type IRoomUseCase interface {
	CreateRoom(user entity.User) (entity.Room, error)
	JoinRoom(roomID string, user entity.User) (entity.Room, error)
	LeaveRoom(roomID string, user entity.User) (entity.Room, error)
}
