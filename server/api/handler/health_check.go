package handler

import (
	"github.com/labstack/echo/v4"

	"chess-alpha/server/usecase/input_port"
)

type HealthCheckHandler struct {
	HealthCheckUC input_port.IHealthCheckUseCase
}

func NewHealthCheckHandler(HealthCheckUC input_port.IHealthCheckUseCase) *HealthCheckHandler {
	return &HealthCheckHandler{HealthCheckUC: HealthCheckUC}
}

func (h *HealthCheckHandler) CheckHealth(c echo.Context) error {
	// エラーがnilなら200,そうでない場合は500を返す
	return h.HealthCheckUC.CheckHealthThroughAdapters()
}
