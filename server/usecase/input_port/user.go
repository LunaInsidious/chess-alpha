package input_port

import (
	"chess-alpha/server/domain/entity"
)

type UserCreate struct {
	LoginID  string
	Password string
	Name     string
}

type IUserUseCase interface {
	Authenticate(token string) (string, error)
	FindByID(userID string) (entity.User, error)
	Login(loginID, password string) (entity.User, string, error)
}
