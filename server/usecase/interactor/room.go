package interactor

import (
	"chess-alpha/server/domain/constructor"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/output_port"
)

type RoomUseCase struct {
	ulid     output_port.ULID
	RoomRepo output_port.RoomRepository
}

func NewRoomUseCase(ulid output_port.ULID, roomRepo output_port.RoomRepository) input_port.IRoomUseCase {
	return &RoomUseCase{
		ulid:     ulid,
		RoomRepo: roomRepo,
	}
}

func (u *RoomUseCase) CreateRoom(user entity.User) (_ entity.Room, err error) {
	room, err := constructor.NewRoom(constructor.NewRoomArgs{
		RoomID: u.ulid.GenerateID(),
		Host: user.UserID,
		Players: []string{
			user.UserID,
		},
		Status: "waiting",
	})
	if err != nil {
		return entity.Room{}, err
	}

	err = u.RoomRepo.CreateRoom(room)
	if err != nil {
		return entity.Room{}, err
	}

	res, err := u.RoomRepo.FindByID(room.RoomID)
	if err != nil {
		return entity.Room{}, err
	}

	return res, nil
}

func (u *RoomUseCase) JoinRoom(roomID string, user entity.User) (_ entity.Room, err error) {
	room, err := u.RoomRepo.FindByID(roomID)
	if err != nil {
		return entity.Room{}, err
	}

	err = u.RoomRepo.JoinRoom(room.RoomID, user.UserID)
	if err != nil {
		return entity.Room{}, err
	}

	res, err := u.RoomRepo.FindByID(room.RoomID)
	if err != nil {
		return entity.Room{}, err
	}

	return res, nil
}

func (u *RoomUseCase) LeaveRoom(roomID string, user entity.User) (_ entity.Room, err error) {
	room, err := u.RoomRepo.FindByID(roomID)
	if err != nil {
		return entity.Room{}, err
	}

	err = u.RoomRepo.LeaveRoom(room.RoomID, user.UserID)
	if err != nil {
		return entity.Room{}, err
	}

	res, err := u.RoomRepo.FindByID(room.RoomID)
	if err != nil {
		return entity.Room{}, err
	}

	return res, nil
}
