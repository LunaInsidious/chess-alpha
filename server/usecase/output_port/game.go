package output_port

import (
	"chess-alpha/server/domain/entity"
	"time"
)

type GameRepository interface {
	Create(entity.Game) error
	UpdateRecord(gameID, record string) error
	UpdateRecordAndResultAndEndAt(gameID, record, result string, endAt *time.Time) error
	FindByID(gameID string) (entity.Game, error)
}
