package input_port

import "chess-alpha/server/domain/entity"

// 役職を確認し、ゲーム画面に遷移する直前に叩く
type GameCreate struct {
	CitizenIDs []string
	WerewolfID string
	GameRecord string
}

// 一手進むごとに叩く
type GameUpdate struct {
	GameID     string
	GameRecord string
}

// 対戦終了時に叩く
type GameEnd struct {
	GameID     string
	GameRecord string
	Result     string
}

type IGameUseCase interface {
	Create(user entity.User, create GameCreate) (entity.Game, error)
	Update(update GameUpdate) (entity.Game, error)
	End(end GameEnd) (entity.Game, error)
	FindByID(id string) (entity.Game, error)
}
