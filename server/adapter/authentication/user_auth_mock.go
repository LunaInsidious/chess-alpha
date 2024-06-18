package authentication

import (
	"time"

	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/output_port"
)

type UserAuthMock struct{}

func (a *UserAuthMock) AuthenticateForUpdateEmail(token string) (string, error) {
	return "a", nil
}

func (a *UserAuthMock) AuthenticateForUpdatePassword(token string) (string, error) {
	return "a", nil
}

func (a *UserAuthMock) IssueUserToken(user entity.User, issuedAt time.Time) (string, error) {
	return "a", nil
}

func (a *UserAuthMock) IssueUserTokenForUpdateEmail(user entity.User, issuedAt time.Time) (string, error) {
	return "a", nil
}

func (a *UserAuthMock) IssueUserTokenForUpdatePassword(user entity.User, issuedAt time.Time) (string, error) {
	return "a", nil
}

const TestPass = "TestPass"

func (a *UserAuthMock) CheckPassword(user entity.User, password string) error {
	if password == TestPass {
		return nil
	}
	return ErrWrongPassword
}

func (a *UserAuthMock) HashPassword(password string) (string, error) {
	return "TestPassHash", nil
}

func (a *UserAuthMock) Authenticate(token string) (string, error) {
	return "a", nil
}

func (a *UserAuthMock) GenerateInitialPassword(length int) (string, error) {
	return "testPass", nil
}

func NewUserAuthMock() output_port.UserAuth {
	return &UserAuthMock{}
}
