package handler

import (
	"net/http"

	"chess-alpha/server/api/middleware"
	"chess-alpha/server/api/schema"
	"chess-alpha/server/usecase/input_port"

	"github.com/labstack/echo/v4"
)

type GameHandler struct {
	GameUC input_port.IGameUseCase
}

func NewGameHandler(gameUC input_port.IGameUseCase) *GameHandler {
	return &GameHandler{GameUC: gameUC}
}

func (h *GameHandler) Create(c echo.Context) error {
	ctx := c.Request().Context()
	user, err := middleware.GetUserFromContext(ctx)
	if err != nil {
		return err
	}

	req, err := BindRequest[schema.GameCreateReq](c)
	if err != nil {
		return err
	}

	res, err := h.GameUC.Create(user, input_port.GameCreate{
		CitizenIDs: req.CitizenIDs,
		WerewolfID: req.WerewolfID,
		GameRecord: req.GameRecord,
	})
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, schema.GameResFromEntity(res))
}

func (h *GameHandler) Update(c echo.Context) error {
	req, err := BindRequest[schema.GameUpdateReq](c)
	if err != nil {
		return err
	}

	res, err := h.GameUC.Update(input_port.GameUpdate{
		GameID:     req.GameID,
		GameRecord: req.GameRecord,
	})
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, schema.GameResFromEntity(res))
}

func (h *GameHandler) End(c echo.Context) error {
	req, err := BindRequest[schema.GameEndReq](c)
	if err != nil {
		return err
	}

	res, err := h.GameUC.End(input_port.GameEnd{
		GameID:     req.GameID,
		GameRecord: req.GameRecord,
		Result:     req.Result,
	})
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, schema.GameResFromEntity(res))
}

func (h *GameHandler) FindById(c echo.Context) error {
	req, err := BindRequest[schema.GameFindByIDReq](c)
	if err != nil {
		return err
	}

	res, err := h.GameUC.FindByID(req.GameID)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, schema.GameResFromEntity(res))
}
