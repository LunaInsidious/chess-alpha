package handler_test

import (
	"encoding/json"
	"net/http/httptest"
	"strings"

	"chess-alpha/server/api/middleware"
	"chess-alpha/server/domain/entity"

	"github.com/labstack/echo/v4"

	"chess-alpha/server/api/handler_mock"
)

/*
このファイルはhandlerパッケージの中で使うツール群
*/

type NoReqType struct{}

func generateEC[T comparable](path, method string, req *T) echo.Context {
	body, _ := json.Marshal(req)
	httpReq := httptest.NewRequest(method, path, strings.NewReader(string(body)))
	httpReq.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	return echo.New().NewContext(httpReq, httptest.NewRecorder())
}

func generateECToFailBind() echo.Context {
	return handler_mock.NewEchoContextMock()
}

func generateECWithPathParam[T comparable](path, method string, req *T, key string, value string) echo.Context {
	c := generateEC(path, method, req)
	c.SetParamNames(key)
	c.SetParamValues(value)
	return c
}

func generateECWithMyUser[T comparable](path, method string, req *T, myUser entity.User) echo.Context {
	c := generateEC(path, method, req)
	ctx := c.Request().Context()
	ctx = middleware.SetUserToContext(ctx, myUser)
	c.SetRequest(c.Request().WithContext(ctx))
	return c
}
