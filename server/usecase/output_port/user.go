package output_port

import (
	"errors"
	"time"

	"chess-alpha/server/domain/entity"
)

var (
	TokenScopeGeneral          = "general"
	TokenGeneralExpireDuration = 7 * 24 * time.Hour // 7 days
	ErrUnknownScope            = errors.New("unknown scope")
	ErrTokenExpired            = errors.New("token expired")
	ErrTokenIssuedFutureTime   = errors.New("token issued future time")
	ErrTokenScopeInvalid       = errors.New("token scope invalid")
)

type UserRepository interface {
	FindByLoginID(loginID string) (entity.User, error)
	FindByID(userID string) (entity.User, error)
	UpdateRate(userID string, rate int) error
}

type UserAuth interface {
	Authenticate(token string) (string, error)
	CheckPassword(user entity.User, password string) error
	HashPassword(password string) (string, error)
	IssueUserToken(user entity.User, issuedAt time.Time) (string, error)
	GenerateInitialPassword(length int) (string, error)
}
