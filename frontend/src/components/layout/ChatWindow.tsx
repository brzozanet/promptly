import { useChatStore } from "@/store/chatStore";
import { ChatInput } from "../chat/ChatInput";
import { MessageList } from "../chat/MessageList";

export function ChatWindow() {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col py-5">
      <MessageList />
      {messages.length !== 0 ? (
        <div className="sticky">
          <ChatInput />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
