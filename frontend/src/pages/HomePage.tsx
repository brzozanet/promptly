import { ChatWindow } from "@/components/layout/ChatWindow";

export function HomePage() {
  return (
    <div className="flex flex-1 h-full w-full flex-col items-center justify-center">
      <ChatWindow />
      {/* <EmptyState /> */}
    </div>
  );
}
