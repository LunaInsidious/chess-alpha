package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"chess-alpha/server/api/handler"
	apiMiddleware "chess-alpha/server/api/middleware"
	"chess-alpha/server/usecase/input_port"
)

func NewServer(
	userUC input_port.IUserUseCase,
	gameUC input_port.IGameUseCase,
	healthCheckUC input_port.IHealthCheckUseCase,
	isLogging bool,
) *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodPatch},
	}))

	if isLogging {
		e.Use(middleware.Logger())
	}
	e.Use(middleware.Recover())
	e.Use(apiMiddleware.NewErrorMiddleware().HandleError)
	e.Pre(middleware.RemoveTrailingSlash())

	authHandler := handler.NewAuthHandler(userUC)
	userHandler := handler.NewUserHandler(userUC)
	gameHandler := handler.NewGameHandler(gameUC)
	healthCheckHandler := handler.NewHealthCheckHandler(healthCheckUC)

	e.GET("/health", healthCheckHandler.CheckHealth)

	api := e.Group("/api")
	api.POST("/auth/access-token", authHandler.Login)

	// auth
	// 認可の例
	auth := api.Group("", apiMiddleware.NewAuthMiddleware(userUC).Authenticate)

	// user
	user := auth.Group("/user")
	user.GET("/me", userHandler.FindMe)
	user.GET("/:user-id", userHandler.FindById)

	game := auth.Group("/game")
	game.POST("/", gameHandler.Create)
	game.PATCH("/update", gameHandler.Update)
	game.PATCH("/end", gameHandler.End)
	game.GET("/:id", gameHandler.FindById)

	return e
}
