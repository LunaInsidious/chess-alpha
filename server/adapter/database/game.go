package database

import (
	"errors"
	"fmt"
	"time"

	"gorm.io/gorm"

	"chess-alpha/server/adapter/database/model"
	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/output_port"
)

type GameRepository struct {
	db *gorm.DB
}

func NewGameRepository(
	db *gorm.DB,
) output_port.GameRepository {
	return &GameRepository{db: db}
}

func (r *GameRepository) Create(game entity.Game) (err error) {
	defer output_port.WrapDatabaseError(&err)
	return r.db.Create(&model.Game{
		GameID: game.GameID,
		Citizens: func() []model.User {
			citizens := make([]model.User, len(game.Citizens))
			for i, citizen := range game.Citizens {
				citizens[i] = model.User{
					UserID: citizen.UserID,
				}
			}
			return citizens
		}(),
		WerewolfID: game.Werewolf.UserID,
		GameRecord: game.GameRecord,
		Result:     game.Result.String(),
		StartAt:    game.StartAt,
		EndAt:      game.EndAt,
	}).Error
}

func (r *GameRepository) UpdateRecord(gameID, record string) (err error) {
	defer output_port.WrapDatabaseError(&err)
	return r.db.
		Where("game_id = ?").
		Updates(&model.Game{
			GameRecord: record,
		}).
		Error
}

func (r *GameRepository) UpdateRecordAndResultAndEndAt(gameID, record, result string, endAt *time.Time) (err error) {
	defer output_port.WrapDatabaseError(&err)
	return r.db.
		Where("game_id = ?").
		Updates(&model.Game{
			GameRecord: record,
			Result:     result,
			EndAt:      endAt,
		}).
		Error
}

func (r *GameRepository) FindByID(gameID string) (game entity.Game, err error) {
	defer output_port.WrapDatabaseError(&err)
	var gameModel model.Game
	if err := r.db.Model(&model.Game{}).
		Where("game_id = ?", gameID).
		First(&gameModel).
		Error; err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return entity.Game{}, entconst.NewNotFoundError(fmt.Errorf("gameID :%s is not found", gameID))
	} else if err != nil {
		return entity.Game{}, err
	}
	return gameModel.Entity(), nil

}
