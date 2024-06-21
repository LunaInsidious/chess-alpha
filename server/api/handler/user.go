package handler

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	"chess-alpha/server/usecase/input_port"
	"chess-alpha/server/usecase/interactor"

	"chess-alpha/server/api/middleware"
	"chess-alpha/server/api/schema"
	log "chess-alpha/server/log"
)

type UserHandler struct {
	UserUC input_port.IUserUseCase
}

func NewUserHandler(userUC input_port.IUserUseCase) *UserHandler {
	return &UserHandler{UserUC: userUC}
}

func (h *UserHandler) FindMe(c echo.Context) error {
	logger, _ := log.NewLogger()

	ctx := c.Request().Context()
	user, err := middleware.GetUserFromContext(ctx) // トークンからuserIDを取得
	if err != nil {
		logger.Error("Failed to get id from context", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	res, err := h.UserUC.FindByID(user.UserID)
	if err != nil {
		logger.Error("Failed to find me", zap.Error(err))
		switch {
		case errors.Is(err, &interactor.NotFoundError{}):
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		default:
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	return c.JSON(http.StatusOK, schema.UserResFromEntity(res))
}

func (h *UserHandler) FindById(c echo.Context) error {
	logger, _ := log.NewLogger()

	var id string
	if err := echo.PathParamsBinder(c).MustString("user-id", &id).BindError(); err != nil {
		logger.Error("Failed to bind path param id", zap.Error(err))
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, err := h.UserUC.FindByID(id)
	if err != nil {
		logger.Error("Failed to find me", zap.Error(err))
		switch {
		case errors.Is(err, &interactor.NotFoundError{}):
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		default:
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	return c.JSON(http.StatusOK, schema.UserResFromEntity(res))
}
