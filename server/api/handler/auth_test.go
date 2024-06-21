package handler_test

import (
	"errors"
	"net/http"
	"reflect"
	"testing"

	"github.com/golang/mock/gomock"

	"chess-alpha/server/usecase/input_port"
	mock_input_port "chess-alpha/server/usecase/input_port_mock"

	"github.com/labstack/echo/v4"

	"chess-alpha/server/adapter/authentication"
	"chess-alpha/server/api/handler"
	"chess-alpha/server/api/schema"
	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/interactor"
)

func TestAuthHandler_Login(t *testing.T) {
	t.Parallel()

	type args struct {
		c echo.Context
	}
	type input struct {
		loginID  string
		password string
	}
	type res struct {
		user  entity.User
		token string
		err   error
	}
	tests := []struct {
		name     string
		input    input
		response res
		wantErr  bool
		args     args
	}{
		{
			name: "success",
			input: input{
				loginID:  "00000000",
				password: "password",
			},
			response: res{
				user: entity.User{
					UserID:         "testId",
					LoginID:        "00000000",
					HashedPassword: "hashedPassword",
				},
				token: "testToken",
				err:   nil,
			},
			wantErr: false,
			args: args{
				c: generateEC[schema.LoginReq](
					"/auth/login",
					http.MethodPost,
					&schema.LoginReq{
						LoginID:  "00000000",
						Password: "password",
					},
				),
			},
		},
		{
			name: "failed with bind error",
			input: input{
				loginID:  "",
				password: "",
			},
			response: res{
				user:  entity.User{},
				token: "",
				err:   nil,
			},
			wantErr: true,
			args: args{
				c: generateECToFailBind(),
			},
		},
		{
			name: "failed with user not found",
			input: input{
				loginID:  "00000000",
				password: "password",
			},
			response: res{
				user:  entity.User{},
				token: "",
				err:   interactor.NewNotFoundError("loginID", "00000000"),
			},
			wantErr: true,
			args: args{
				c: generateEC[schema.LoginReq](
					"/auth/login",
					http.MethodPost,
					&schema.LoginReq{
						LoginID:  "00000000",
						Password: "password",
					},
				),
			},
		},
		{
			name: "failed with unauthorized",
			input: input{
				loginID:  "00000000",
				password: "password",
			},
			response: res{
				user:  entity.User{},
				token: "",
				err:   authentication.ErrWrongPassword,
			},
			wantErr: true,
			args: args{
				c: generateEC[schema.LoginReq](
					"/auth/login",
					http.MethodPost,
					&schema.LoginReq{
						LoginID:  "00000000",
						Password: "password",
					},
				),
			},
		},
		{
			name: "failed with any error on usecase",
			input: input{
				loginID:  "00000000",
				password: "password",
			},
			response: res{
				user:  entity.User{},
				token: "testToken",
				err:   errors.New("any error"),
			},
			wantErr: true,
			args: args{
				c: generateEC[schema.LoginReq](
					"/auth/login",
					http.MethodPost,
					&schema.LoginReq{
						LoginID:  "00000000",
						Password: "password",
					},
				),
			},
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			mockCtrl := gomock.NewController(t)
			t.Cleanup(mockCtrl.Finish)

			mockUserUC := mock_input_port.NewMockIUserUseCase(mockCtrl)
			mockUserUC.EXPECT().Login(tt.input.loginID, tt.input.password).Return(tt.response.user, tt.response.token, tt.response.err).AnyTimes()

			h := &handler.AuthHandler{
				UserUC: mockUserUC,
			}
			if err := h.Login(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("Login() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestNewAuthHandler(t *testing.T) {
	t.Parallel()
	type args struct {
		userUC input_port.IUserUseCase
	}
	tests := []struct {
		name string
		args args
		want *handler.AuthHandler
	}{
		{
			name: "success",
			args: args{
				userUC: &interactor.UserUseCase{},
			},
			want: &handler.AuthHandler{UserUC: &interactor.UserUseCase{}},
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := handler.NewAuthHandler(tt.args.userUC); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewAuthHandler() = %v, want %v", got, tt.want)
			}
		})
	}
}
