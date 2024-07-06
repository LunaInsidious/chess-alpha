package handler

import (
	"chess-alpha/server/domain/ws"
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type WebsocketHandler struct {
	hub *ws.Hub
}

func NewWebsocketHandler(hub *ws.Hub) *WebsocketHandler {
	return &WebsocketHandler{
		hub: hub,
	}
}

var upgrader = &websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *WebsocketHandler) Handle(c echo.Context) error {

	websocket, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		fmt.Println(err, "aaaaaaaa")
		return err
	}

	client := ws.NewClient(websocket)
	go client.ReadLoop(h.hub.BroadcastCh, h.hub.UnregisterCh)
	go client.WriteLoop()
	h.hub.RegisterCh <- client

	return nil
}
