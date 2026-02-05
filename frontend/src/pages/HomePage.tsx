import { ChatWindow } from "@/components/layout/ChatWindow";
import { EmptyChat } from "@/components/layout/EmptyChat";
import { useChatStore } from "@/store/chatStore";

export function HomePage() {
  const messages = useChatStore((store) => store.messages);

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 text-center">
      {messages.length === 0 ? <EmptyChat /> : <ChatWindow />}
    </div>
  );
}
