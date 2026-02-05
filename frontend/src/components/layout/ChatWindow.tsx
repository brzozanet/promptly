import { ChatInput } from "../chat/ChatInput";
import { MessageList } from "../chat/MessageList";

export function ChatWindow() {
  return (
    <div className="flex h-[calc(100vh-160px)] w-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl py-5">
          <MessageList />
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto max-w-5xl">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
