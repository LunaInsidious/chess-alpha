package output_port

import (
	"time"

	"chess-alpha/server/domain/entity"
)

type GameRepository interface {
	Create(entity.Game) error
	UpdateRecord(gameID, record string) error
	UpdateRecordAndResultAndEndAt(gameID, record, result string, endAt *time.Time) error
	FindByID(gameID string) (entity.Game, error)
}
