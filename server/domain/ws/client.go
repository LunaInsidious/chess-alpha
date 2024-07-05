package ws

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ws     *websocket.Conn
	sendCh chan []byte
}

func NewClient(ws *websocket.Conn) *Client {
	return &Client{
		ws:     ws,
		sendCh: make(chan []byte),
	}
}

func (c *Client) ReadLoop(broafCast chan<- []byte, unregister chan<- *Client) {
	defer func() {
		c.disconnect(unregister)
	}()

	for {
		_, msg, err := c.ws.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("unexpected close error: %v", err)
			}
			break
		}
		broafCast <- msg
	}

}

func (c *Client) WriteLoop() {
	defer func() {
		c.ws.Close()
	}()

	for {
		message := <-c.sendCh

		w, err := c.ws.NextWriter(websocket.TextMessage)
		if err != nil {
			return
		}

		_, err = w.Write(message)
		if err != nil {
			return
		}

		if err := w.Close(); err != nil {
			return
		}
	}
}

func (c *Client) disconnect(unregisterCh chan<- *Client) {
	unregisterCh <- c
	c.ws.Close()
}
