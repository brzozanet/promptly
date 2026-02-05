import { ChatInput } from "../chat/ChatInput";
import { MessageList } from "../chat/MessageList";

export function ChatWindow() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col py-5">
      <MessageList />
      <ChatInput />
    </div>
  );
}
