package handler

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	"chess-alpha/server/adapter/authentication"
	"chess-alpha/server/api/schema"
	log "chess-alpha/server/log"
	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/interactor"
)

type AuthHandler struct {
	UserUC input_port.IUserUseCase
}

func NewAuthHandler(userUC input_port.IUserUseCase) *AuthHandler {
	return &AuthHandler{UserUC: userUC}
}

// Login POST /auth/access-token
func (h *AuthHandler) Login(c echo.Context) error {
	logger, _ := log.NewLogger()

	req := &schema.LoginReq{}
	if err := c.Bind(req); err != nil {
		logger.Error("Failed to bind request", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	user, token, err := h.UserUC.Login(req.LoginID, req.Password)
	if err != nil {
		logger.Error("Failed to login", zap.Error(err))
		switch {
		case errors.Is(err, &interactor.NotFoundError{}):
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		case errors.Is(err, authentication.ErrWrongPassword):
			return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
		default:
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	loginUser := &schema.LoginResUser{
		UserId:  user.UserID,
		LoginID: user.LoginID,
	}

	return c.JSON(http.StatusOK, &schema.LoginRes{
		AccessToken: token,
		TokenType:   schema.TokenType,
		User:        *loginUser,
	})
}
