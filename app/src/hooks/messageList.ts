import { useRecoilValue, useRecoilCallback } from "recoil";

import { MessageForWs } from "@/domains/ws/message";
import { messageListAtom } from "@/state/message";
import { websocketAtom } from "@/state/websocket";

export const useMessageList = (): MessageForWs[] => {
  const socket = useRecoilValue(websocketAtom);
  const messageList = useRecoilValue(messageListAtom);

  const updateMessageList = useRecoilCallback(
    ({ set }) =>
      (message: MessageForWs) => {
        set(messageListAtom, [...messageList, message]);
      },
  );
  socket.onmessage = (msg) => {
    const content = JSON.parse(msg.data as string);
    const message: MessageForWs = { content };
    updateMessageList(message);
  };

  return messageList;
};
