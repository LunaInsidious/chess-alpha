package interactor

import (
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/output_port"
)

type UserUseCase struct {
	clock       output_port.Clock
	ulid        output_port.ULID
	transaction output_port.Transaction
	userAuth    output_port.UserAuth
	userRepo    output_port.UserRepository
}

func NewUserUseCase(
	clock output_port.Clock,
	ulid output_port.ULID,
	transaction output_port.Transaction,
	userAuth output_port.UserAuth,
	userRepo output_port.UserRepository,
) input_port.IUserUseCase {
	return &UserUseCase{
		clock:       clock,
		ulid:        ulid,
		transaction: transaction,
		userAuth:    userAuth,
		userRepo:    userRepo,
	}
}

func (u *UserUseCase) Login(loginID, password string) (entity.User, string, error) {
	user, err := u.userRepo.FindByLoginID(loginID)
	if err != nil {
		return entity.User{}, "", err
	}

	err = u.userAuth.CheckPassword(user, password)
	if err != nil {
		return entity.User{}, "", err
	}

	token, err := u.userAuth.IssueUserToken(user, u.clock.Now())
	if err != nil {
		return entity.User{}, "", err
	}

	return user, token, nil
}

func (u *UserUseCase) Authenticate(token string) (string, error) {
	return u.userAuth.Authenticate(token)
}

func (u *UserUseCase) FindByID(userID string) (entity.User, error) {
	return u.userRepo.FindByID(userID)
}
