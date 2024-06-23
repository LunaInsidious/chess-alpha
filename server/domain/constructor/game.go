package constructor

import (
	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/entity"
	"errors"
	"fmt"
	"time"
)

type NewGameArgs struct {
	GameID     string
	CitizenIDs []string
	WerewolfID string
	GameRecord string
	Result     string
	StartAt    time.Time
	EndAt      *time.Time
}

func NewGame(args NewGameArgs) (entity.Game, error) {
	errs := make([]error, 0, 10)

	if args.GameID == "" {
		errs = append(errs, entconst.NewValidationErrorFromMsg("gameID is required"))
	}

	for i, citizenID := range args.CitizenIDs {
		if citizenID == "" {
			errs = append(errs, entconst.NewValidationError(fmt.Errorf("citizenID is required in index %d", i)))
		}
	}

	if len(args.CitizenIDs) < 2 || len(args.CitizenIDs) > 5 {
		errs = append(errs, entconst.NewValidationErrorFromMsg("citizen must be at least 2 and no more than 5"))
	}

	if args.WerewolfID == "" {
		errs = append(errs, entconst.NewValidationErrorFromMsg("werewolfID is required"))
	}

	if args.GameRecord == "" {
		errs = append(errs, entconst.NewValidationErrorFromMsg("gameRecord is required"))
	}

	if args.StartAt.IsZero() {
		errs = append(errs, entconst.NewValidationErrorFromMsg("startAt is required"))
	}

	if len(errs) > 0 {
		return entity.Game{}, errors.Join(errs...)
	}

	return entity.Game{
		GameID: args.GameID,
		Citizens: func() []entity.User {
			citizens := make([]entity.User, len(args.CitizenIDs))
			for i, citizenID := range args.CitizenIDs {
				citizens[i] = entity.User{
					UserID: citizenID,
				}
			}
			return citizens
		}(),
		Werewolf: entity.User{
			UserID: args.WerewolfID,
		},
		GameRecord: args.GameRecord,
		Result:     args.Result,
		StartAt:    args.StartAt,
		EndAt:      args.EndAt,
	}, nil
}
