package constructor

import (
	"errors"

	"chess-alpha/server/domain/entity"
)

type NewRoomArgs struct {
	RoomID string
	Host   string
	Players []string
	Status string
}

func NewRoom(args NewRoomArgs) (entity.Room, error) {
	errs := make([]error, 0, 10)

	if args.RoomID == "" {
		errs = append(errs, errors.New("roomID is required."))
	}

	if args.Host == "" {
		errs = append(errs, errors.New("Host is required."))
	}

	if len(args.Players) == 0 {
		errs = append(errs, errors.New("Players is required."))
	}

	if args.Status == "" {
		errs = append(errs, errors.New("status is required."))
	}

	if len(errs) > 0 {
		return entity.Room{}, errors.Join(errs...)
	}

	return entity.Room{
		RoomID:  args.RoomID,
		Host:    args.Host,
		Players: args.Players,
		Status:  args.Status,
	}, nil
}
