package middleware

import (
	"strings"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	"chess-alpha/server/api/schema"
	"chess-alpha/server/log"
	"chess-alpha/server/usecase/input_port"

	"context"
	"errors"

	"chess-alpha/server/domain/entconst"
	"chess-alpha/server/domain/entity"
)

var (
	ErrNoAuthorizationHeader = errors.New("no authorization header passed")
	ErrNotSystemAdmin        = errors.New("you are not system admin")
)

type AuthMiddleware struct {
	userUC input_port.IUserUseCase
}

func NewAuthMiddleware(userUC input_port.IUserUseCase) *AuthMiddleware {
	return &AuthMiddleware{userUC}
}

// Authenticate
// tokenを取得して、認証するmiddlewareの例
func (m *AuthMiddleware) Authenticate(next echo.HandlerFunc) echo.HandlerFunc {
	logger, _ := log.NewLogger()

	return func(c echo.Context) error {
		// Get JWT Token From Header
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, schema.TokenType+" ") {
			logger.Warn("Failed to authenticate", zap.Error(ErrNoAuthorizationHeader))
			return entconst.NewUnauthorizedErrorFromMsg("token is invalid")
		}
		token := strings.TrimPrefix(authHeader, schema.TokenType+" ")

		// Authenticate
		userID, err := m.userUC.Authenticate(token)
		if err != nil {
			logger.Warn("Failed to authenticate", zap.Error(err))
			return entconst.NewUnauthorizedErrorFromMsg("token is invalid")
		}

		// set user detail to context
		user, err := m.userUC.FindByID(userID)
		if err != nil {
			logger.Warn("Failed to find me", zap.Error(err))
			return entconst.NewUnauthorizedErrorFromMsg("token is invalid")
		}
		c = SetToContext(c, user)

		return next(c)
	}
}

func SetToContext(c echo.Context, user entity.User) echo.Context {
	ctx := c.Request().Context()
	ctx = SetUserToContext(ctx, user)
	c.SetRequest(c.Request().WithContext(ctx))
	return c
}

type ContextKey string

var (
	userKey ContextKey = "userKey"
)

func SetUserToContext(ctx context.Context, user entity.User) context.Context {
	return context.WithValue(ctx, userKey, user)
}

func GetUserFromContext(ctx context.Context) (entity.User, error) {
	v := ctx.Value(userKey)
	user, ok := v.(entity.User)
	if !ok {
		return entity.User{}, errors.New("no user found in context")
	}
	return user, nil
}
