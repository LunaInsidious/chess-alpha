import { atom, selector } from "recoil";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const connect = (): Promise<W3CWebSocket> =>
  new Promise((resolve, reject) => {
    const socket = new W3CWebSocket("ws://localhost:80/ws");
    socket.onopen = () => {
      console.log("connected");
      resolve(socket);
    };
    socket.onclose = () => {
      console.log("reconnecting...");
      connect();
    };
    socket.onerror = (err) => {
      console.log("connection error:", err);
      reject(err);
    };
  });

const connectWebsocketSelector = selector({
  key: "connectWebsocket",
  get: async (): Promise<W3CWebSocket> => connect(),
});

export const websocketAtom = atom<W3CWebSocket>({
  key: "websocket",
  default: connectWebsocketSelector,
});
