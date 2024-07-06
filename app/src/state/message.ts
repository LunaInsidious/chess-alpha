import { atom } from "recoil";

import { MessageForWs } from "@/domains/ws/message";

export const messageListAtom = atom<MessageForWs[]>({
  key: "messageList",
  default: [],
});
