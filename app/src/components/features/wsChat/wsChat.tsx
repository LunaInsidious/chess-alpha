import { useMessageList } from "@/hooks/messageList";
import { useSendMessage } from "@/hooks/sendMessage";

export function MessageComponent() {
  const messageList = useMessageList();
  const { input, setInput, send } = useSendMessage();

  return (
    <div>
      <div>
        {messageList.map((m) => (
          <div>{m.content}</div>
        ))}
      </div>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="new message"
        />
        <button type="button" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
