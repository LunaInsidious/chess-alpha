package database

import (
	"chess-alpha/server/adapter/database/model"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/interactor"
	"chess-alpha/server/usecase/output_port"
	"errors"

	"gorm.io/gorm"
)

type RoomRepository struct {
	db *gorm.DB
}

func NewRoomRepository(
	db *gorm.DB,
	ulid output_port.ULID,
) output_port.RoomRepository {
	return &RoomRepository{db: db}
}

func (r RoomRepository) FindByID(roomID string) (_ entity.Room, err error) {
	defer output_port.WrapDatabaseError(&err)
	res := model.Room{}
	err = r.db.
		Where("room_id = ?", roomID).
		First(&res).
		Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return entity.Room{}, interactor.NewNotFoundError("roomID", roomID)
	}
	if err != nil {
		return entity.Room{}, err
	}
	return res.Entity(), nil
}

func (r *RoomRepository) CreateRoom(room entity.Room) (err error) {
	defer output_port.WrapDatabaseError(&err)
	roomModel := model.Room{
		RoomID: room.RoomID,
		Host:   room.Host,
		Players: room.Players,
		Status: room.Status,
	}
	return r.db.Create(&roomModel).Error
}

func (r *RoomRepository) JoinRoom(roomID string, userID string) (err error) {
	defer output_port.WrapDatabaseError(&err)
	var room model.Room
	if err := r.db.Where("room_id = ?", roomID).First(&room).Error; err != nil {
		return err
	}
	room.Players = append(room.Players, userID)
	return r.db.Save(&room).Error
}

func (r *RoomRepository) LeaveRoom(roomID string, userID string) (err error) {
	defer output_port.WrapDatabaseError(&err)
	var room model.Room
	if err := r.db.Where("room_id = ?", roomID).First(&room).Error; err != nil {
		return err
	}
	for i, player := range room.Players {
		if player == userID {
			room.Players = append(room.Players[:i], room.Players[i+1:]...)
			break
		}
	}
	return r.db.Save(&room).Error
}
