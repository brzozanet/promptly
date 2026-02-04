import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

export function ChatWindow() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <MessageList />
      <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur">
        <ChatInput />
      </div>
    </div>
  );
}
