import { ChatWindow } from "@/components/chat/ChatWindow";

export function HomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-6 text-center">
      <ChatWindow />
    </div>
  );
}
