package middleware

import (
	"errors"
	"net/http"

	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/log"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type ErrorMiddleware struct {
}

func NewErrorMiddleware() *ErrorMiddleware {
	return &ErrorMiddleware{}
}

func (m *ErrorMiddleware) HandleError(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		err := next(c)
		if err == nil {
			return nil
		}
		logger, _ := log.NewLogger()
		logger.Info("failed API", zap.Error(err))
		switch {
		case errors.As(err, new(*entconst.ValidationError)):
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		case errors.As(err, new(*entconst.UnauthorizedError)):
			return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
		case errors.As(err, new(*entconst.HasNoPermissionError)):
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		case errors.As(err, new(*entconst.NotFoundError)):
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		case errors.As(err, new(*entconst.ConflictError)):
			return echo.NewHTTPError(http.StatusConflict, err.Error())
		case errors.As(err, new(*entconst.DatabaseError)):
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		default:
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}
}
