package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	"chess-alpha/server/usecase/input_port"

	"chess-alpha/server/api/middleware"
	"chess-alpha/server/api/schema"
	log "chess-alpha/server/log"
)

type RoomHandler struct {
	RoomUC input_port.IRoomUseCase
}

func NewRoomHandler(roomUC input_port.IRoomUseCase) *RoomHandler {
	return &RoomHandler{RoomUC: roomUC}
}

func (h *RoomHandler) CreateRoom(c echo.Context) error {
	logger, _ := log.NewLogger()

	ctx := c.Request().Context()
	user, err := middleware.GetUserFromContext(ctx)
	if err != nil {
		logger.Error("Failed to get user from context", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	res, err := h.RoomUC.CreateRoom(user)
	if err != nil {
		logger.Error("Failed to create room", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, schema.RoomResFromEntity(res))
}

func (h *RoomHandler) JoinRoom(c echo.Context) error {
	logger, _ := log.NewLogger()

	ctx := c.Request().Context()
	user, err := middleware.GetUserFromContext(ctx)
	if err != nil {
		logger.Error("Failed to get user from context", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	var roomID string
	if err := echo.PathParamsBinder(c).MustString("room-id", &roomID).BindError(); err != nil {
		logger.Error("Failed to bind path param room-id", zap.Error(err))
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, err := h.RoomUC.JoinRoom(roomID, user)
	if err != nil {
		logger.Error("Failed to join room", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, schema.RoomResFromEntity(res))
}

func (h *RoomHandler) LeaveRoom(c echo.Context) error {
	logger, _ := log.NewLogger()

	ctx := c.Request().Context()
	user, err := middleware.GetUserFromContext(ctx)
	if err != nil {
		logger.Error("Failed to get user from context", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	var roomID string
	if err := echo.PathParamsBinder(c).MustString("room-id", &roomID).BindError(); err != nil {
		logger.Error("Failed to bind path param room-id", zap.Error(err))
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, err := h.RoomUC.LeaveRoom(roomID, user)
	if err != nil {
		logger.Error("Failed to leave room", zap.Error(err))
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, schema.RoomResFromEntity(res))
}
