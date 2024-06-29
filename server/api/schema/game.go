package schema

import "chess-alpha/server/domain/entity"

type GameCreateReq struct {
	CitizenIDs []string `json:"citizenIds"`
	WerewolfID string   `json:"werewolfIds"`
	GameRecord string   `json:"gameRecord"`
}

type GameUpdateReq struct {
	GameID     string `param:"game-id"`
	GameRecord string `json:"gameRecord"`
}

type GameEndReq struct {
	GameID     string `param:"game-id"`
	GameRecord string `json:"gameRecord"`
	Result     string `json:"result"`
}

type GameFindByIDReq struct {
	GameID string `param:"game-id"`
}

type GameRes struct {
	GameID     string    `json:"gameId"`
	Citizens   []UserRes `json:"citizens"`
	Werewolf   UserRes   `json:"werewolf"`
	GameRecord string    `json:"gameRecord"`
}

func GameResFromEntity(entity entity.Game) GameRes {
	citizens := make([]UserRes, len(entity.Citizens))
	for i, citizen := range entity.Citizens {
		citizens[i] = UserResFromEntity(citizen)
	}
	return GameRes{
		GameID:     entity.GameID,
		Citizens:   citizens,
		Werewolf:   UserResFromEntity(entity.Werewolf),
		GameRecord: entity.GameRecord,
	}
}
