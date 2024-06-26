package interactor

import (
	"chess-alpha/server/domain/constructor"
	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/output_port"
	"chess-alpha/server/util/set"
)

type GameUseCase struct {
	clock       output_port.Clock
	ulid        output_port.ULID
	transaction output_port.Transaction
	userRepo    output_port.UserRepository
	gameRepo    output_port.GameRepository
}

func NewGameUseCase(
	clock output_port.Clock,
	ulid output_port.ULID,
	transaction output_port.Transaction,
	userRepo output_port.UserRepository,
	gameRepo output_port.GameRepository,
) input_port.IGameUseCase {
	return &GameUseCase{
		clock:       clock,
		ulid:        ulid,
		transaction: transaction,
		userRepo:    userRepo,
		gameRepo:    gameRepo,
	}
}

func (u *GameUseCase) Create(user entity.User, gameCreate input_port.GameCreate) (entity.Game, error) {
	userIDs := set.New[string](append(gameCreate.CitizenIDs, gameCreate.WerewolfID)...)

	if !userIDs.Includes(user.UserID) {
		return entity.Game{}, entconst.NewValidationErrorFromMsg("request user is not player.")
	}

	gameID := u.ulid.GenerateID()
	now := u.clock.Now()

	game, err := constructor.NewGame(constructor.NewGameArgs{
		GameID:     gameID,
		CitizenIDs: gameCreate.CitizenIDs,
		WerewolfID: gameCreate.WerewolfID,
		GameRecord: gameCreate.GameRecord,
		Result:     "",
		StartAt:    now,
		EndAt:      nil,
	})
	if err != nil {
		return entity.Game{}, err
	}

	if err = u.gameRepo.Create(game); err != nil {
		return entity.Game{}, err
	}

	return u.gameRepo.FindByID(gameID)
}

func (u *GameUseCase) Update(gameUpdate input_port.GameUpdate) (entity.Game, error) {
	if err := u.gameRepo.UpdateRecord(gameUpdate.GameID, gameUpdate.GameRecord); err != nil {
		return entity.Game{}, err
	}

	return u.gameRepo.FindByID(gameUpdate.GameID)
}

func (u *GameUseCase) End(gameEnd input_port.GameEnd) (entity.Game, error) {
	result, err := entconst.ConvertResultFromString(gameEnd.Result)
	if err != nil {
		return entity.Game{}, err
	}

	now := u.clock.Now()

	game, err := u.gameRepo.FindByID(gameEnd.GameID)
	if err != nil {
		return entity.Game{}, err
	}

	if err = u.transaction.StartTransaction(func(tx interface{}) error {
		if err := u.gameRepo.UpdateRecordAndResultAndEndAt(gameEnd.GameID, gameEnd.GameRecord, gameEnd.Result, &now); err != nil {
			return err
		}

		for _, user := range game.Citizens {
			rateDiff := entconst.GetRateDiff(result, true)
			if err = u.userRepo.UpdateRate(user.UserID, user.Rate+rateDiff); err != nil {
				return err
			}
		}

		rateDiff := entconst.GetRateDiff(result, false)
		if err = u.userRepo.UpdateRate(game.Werewolf.UserID, game.Werewolf.Rate+rateDiff); err != nil {
			return err
		}

		return nil
	}); err != nil {
		return entity.Game{}, err
	}

	return u.gameRepo.FindByID(gameEnd.GameID)
}

func (u *GameUseCase) FindByID(gameID string) (entity.Game, error) {
	return u.gameRepo.FindByID(gameID)
}
