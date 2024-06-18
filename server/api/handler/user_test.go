package handler_test

import (
	"errors"
	"net/http"
	"reflect"
	"testing"

	"github.com/golang/mock/gomock"

	"chess-alpha/server/domain/entity"
	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/interactor"

	"chess-alpha/server/api/handler"

	"github.com/labstack/echo/v4"

	mock_input_port "chess-alpha/server/usecase/input_port_mock"
)

func TestNewUserHandler(t *testing.T) {
	t.Parallel()

	type args struct {
		userUC input_port.IUserUseCase
	}
	tests := []struct {
		name string
		args args
		want *handler.UserHandler
	}{
		{
			name: "success",
			args: args{
				userUC: func() input_port.IUserUseCase {
					return mock_input_port.NewMockIUserUseCase(nil)
				}(),
			},
			want: &handler.UserHandler{
				UserUC: func() input_port.IUserUseCase {
					return mock_input_port.NewMockIUserUseCase(nil)
				}(),
			},
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := handler.NewUserHandler(tt.args.userUC); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewUserHandler() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestUserHandler_FindById(t *testing.T) {
	t.Parallel()
	type fields struct {
		newUserUC func(mockCtrl *gomock.Controller) input_port.IUserUseCase
	}
	type args struct {
		c echo.Context
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "success",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					ret := mock_input_port.NewMockIUserUseCase(mockCtrl)
					ret.EXPECT().FindByID("testId").Return(entity.User{UserID: "testId"}, nil)
					return ret
				},
			},
			args: args{
				c: generateECWithPathParam[NoReqType](
					"/api/user",
					http.MethodGet,
					nil,
					"user-id",
					"testId",
				),
			},
			wantErr: false,
		},
		{
			name: "failed with ErrUserNotFound",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					ret := mock_input_port.NewMockIUserUseCase(mockCtrl)
					ret.EXPECT().FindByID("testId").Return(entity.User{}, interactor.NewNotFoundError("userID", "testId"))
					return ret
				},
			},
			args: args{
				c: generateECWithPathParam[NoReqType](
					"/api/user",
					http.MethodGet,
					nil,
					"user-id",
					"testId",
				),
			},
			wantErr: true,
		},
		{
			name: "failed with any error",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					ret := mock_input_port.NewMockIUserUseCase(mockCtrl)
					ret.EXPECT().FindByID("testId").Return(entity.User{}, errors.New("usecase error"))
					return ret
				},
			},
			args: args{
				c: generateECWithPathParam[NoReqType](
					"/api/user",
					http.MethodGet,
					nil,
					"user-id",
					"testId",
				),
			},
			wantErr: true,
		},
		{
			name: "failed with no id",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					return mock_input_port.NewMockIUserUseCase(mockCtrl)
				},
			},
			args: args{
				c: generateECWithPathParam[NoReqType](
					"/api/user",
					http.MethodGet,
					nil,
					"",
					"",
				),
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			mockCtrl := gomock.NewController(t)
			defer mockCtrl.Finish()
			h := &handler.UserHandler{
				UserUC: tt.fields.newUserUC(mockCtrl),
			}
			if err := h.FindById(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("FindByID() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestUserHandler_FindMe(t *testing.T) {
	t.Parallel()
	type fields struct {
		newUserUC func(mockCtrl *gomock.Controller) input_port.IUserUseCase
	}
	type args struct {
		c echo.Context
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "success",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					ret := mock_input_port.NewMockIUserUseCase(mockCtrl)
					ret.EXPECT().FindByID("testId").Return(entity.User{UserID: "testId"}, nil)
					return ret
				},
			},
			args: args{
				c: generateECWithMyUser[NoReqType](
					"/api/user/me",
					http.MethodGet,
					nil,
					entity.User{UserID: "testId"},
				),
			},
			wantErr: false,
		},
		{
			name: "failed with ErrUserNotFound",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					ret := mock_input_port.NewMockIUserUseCase(mockCtrl)
					ret.EXPECT().FindByID("testId").Return(entity.User{}, interactor.NewNotFoundError("userID", "testId"))
					return ret
				},
			},
			args: args{
				c: generateECWithMyUser[NoReqType](
					"/api/user/me",
					http.MethodGet,
					nil,
					entity.User{UserID: "testId"},
				),
			},
			wantErr: true,
		},
		{
			name: "failed with any error on usecase",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					ret := mock_input_port.NewMockIUserUseCase(mockCtrl)
					ret.EXPECT().FindByID("testId").Return(entity.User{}, errors.New("any error"))
					return ret
				},
			},
			args: args{
				c: generateECWithMyUser[NoReqType](
					"/api/user/me",
					http.MethodGet,
					nil,
					entity.User{UserID: "testId"},
				),
			},
			wantErr: true,
		},
		{
			name: "failed with no user",
			fields: fields{
				newUserUC: func(mockCtrl *gomock.Controller) input_port.IUserUseCase {
					return mock_input_port.NewMockIUserUseCase(mockCtrl)
				},
			},
			args: args{
				c: generateEC[NoReqType](
					"/api/user/me",
					http.MethodGet,
					nil,
				),
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			mockCtrl := gomock.NewController(t)
			defer mockCtrl.Finish()
			h := &handler.UserHandler{
				UserUC: tt.fields.newUserUC(mockCtrl),
			}
			if err := h.FindMe(tt.args.c); (err != nil) != tt.wantErr {
				t.Errorf("FindMe() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
