package output_port

import (
	"errors"
	"time"

	"chess-alpha/server/domain/entity"
)

var (
	TokenScopeGeneral                 = "general"
	TokenGeneralExpireDuration        = 7 * 24 * time.Hour // 7 days
	TokenScopeUpdateEmail             = "updateEmail"
	TokenEmailUpdateExpireDuration    = 24 * time.Hour // 1 day
	TokenScopeUpdatePassword          = "updatePassword"
	TokenChangePasswordExpireDuration = 24 * time.Hour // 1 day
	ErrUnknownScope                   = errors.New("unknown scope")
	ErrTokenExpired                   = errors.New("token expired")
	ErrTokenIssuedFutureTime          = errors.New("token issued future time")
	ErrTokenScopeInvalid              = errors.New("token scope invalid")
)

type UserRepository interface {
	FindByLoginID(loginID string) (entity.User, error)
	FindByID(userID string) (entity.User, error)
}

type UserAuth interface {
	Authenticate(token string) (string, error)
	AuthenticateForUpdateEmail(token string) (string, error)
	AuthenticateForUpdatePassword(token string) (string, error)
	CheckPassword(user entity.User, password string) error
	HashPassword(password string) (string, error)
	IssueUserToken(user entity.User, issuedAt time.Time) (string, error)
	IssueUserTokenForUpdateEmail(user entity.User, issuedAt time.Time) (string, error)
	IssueUserTokenForUpdatePassword(user entity.User, issuedAt time.Time) (string, error)
	GenerateInitialPassword(length int) (string, error)
}
