package interactor_test

import (
	"errors"
	"testing"
	"time"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/interactor"
	mock_output_port "chess-alpha/server/usecase/output_port_mock"
)

func TestUserUseCase_Login(t *testing.T) {
	t.Parallel()

	type args struct {
		loginID, password string
	}
	type mockReturns struct {
		findByEmailReturn    entity.User
		issueUserTokenReturn string
	}
	type errorCases struct {
		findByEmailError    error
		checkPasswordError  error
		issueUserTokenError error
	}
	type expectedResponse struct {
		user  entity.User
		token string
		err   error
	}
	type expectedMockCounts struct {
		findByEmail, checkPassword, issueUserToken, now int
	}

	tests := []struct {
		name               string
		args               args
		mockReturns        mockReturns
		errors             errorCases
		expectedResponse   expectedResponse
		expectedMockCounts expectedMockCounts
	}{
		{
			name: "success",
			args: args{loginID: "00000000", password: "password"},
			mockReturns: mockReturns{
				findByEmailReturn:    entity.User{UserID: "testUser"},
				issueUserTokenReturn: "testToken",
			},
			errors: errorCases{},
			expectedResponse: expectedResponse{
				user:  entity.User{UserID: "testUser"},
				token: "testToken",
				err:   nil,
			},
			expectedMockCounts: expectedMockCounts{findByEmail: 1, checkPassword: 1, issueUserToken: 1, now: 1},
		},
		{
			name:        "fail; user not found",
			args:        args{loginID: "00000000", password: "password"},
			mockReturns: mockReturns{},
			errors: errorCases{
				findByEmailError: errors.New("user not found"),
			},
			expectedResponse: expectedResponse{
				user:  entity.User{},
				token: "",
				err:   errors.New("user not found"),
			},
			expectedMockCounts: expectedMockCounts{findByEmail: 1, checkPassword: 0, issueUserToken: 0, now: 0},
		},
		{
			name: "fail; wrong password",
			args: args{loginID: "00000000", password: "password"},
			mockReturns: mockReturns{
				findByEmailReturn: entity.User{UserID: "testUser"},
			},
			errors: errorCases{
				checkPasswordError: errors.New("wrong password"),
			},
			expectedResponse: expectedResponse{
				user:  entity.User{},
				token: "",
				err:   errors.New("wrong password"),
			},
			expectedMockCounts: expectedMockCounts{findByEmail: 1, checkPassword: 1, issueUserToken: 0, now: 0},
		},
		{
			name: "fail; issue token error",
			args: args{loginID: "00000000", password: "password"},
			mockReturns: mockReturns{
				findByEmailReturn: entity.User{UserID: "testUser"},
			},
			errors: errorCases{
				issueUserTokenError: errors.New("failed to issue token"),
			},
			expectedResponse: expectedResponse{
				user:  entity.User{},
				token: "",
				err:   errors.New("failed to issue token"),
			},
			expectedMockCounts: expectedMockCounts{findByEmail: 1, checkPassword: 1, issueUserToken: 1, now: 1},
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			mockCtrl := gomock.NewController(t)
			defer mockCtrl.Finish()

			mockClock := mock_output_port.NewMockClock(mockCtrl)
			mockUserAuth := mock_output_port.NewMockUserAuth(mockCtrl)
			mockUserRepo := mock_output_port.NewMockUserRepository(mockCtrl)

			mockUserRepo.EXPECT().FindByLoginID(tt.args.loginID).Return(tt.mockReturns.findByEmailReturn, tt.errors.findByEmailError).Times(tt.expectedMockCounts.findByEmail)
			mockUserAuth.EXPECT().CheckPassword(tt.mockReturns.findByEmailReturn, tt.args.password).Return(tt.errors.checkPasswordError).Times(tt.expectedMockCounts.checkPassword)
			mockClock.EXPECT().Now().Return(time.Now()).Times(tt.expectedMockCounts.now)
			mockUserAuth.EXPECT().IssueUserToken(tt.mockReturns.findByEmailReturn, gomock.Any()).Return(tt.mockReturns.issueUserTokenReturn, tt.errors.issueUserTokenError).Times(tt.expectedMockCounts.issueUserToken)

			u := interactor.NewUserUseCase(mockClock, nil, nil, mockUserAuth, mockUserRepo).(*interactor.UserUseCase)
			gotUser, gotToken, err := u.Login(tt.args.loginID, tt.args.password)

			assert.Equal(t, tt.expectedResponse.err, err)
			assert.Equal(t, tt.expectedResponse.user, gotUser)
			assert.Equal(t, tt.expectedResponse.token, gotToken)
		})
	}
}
