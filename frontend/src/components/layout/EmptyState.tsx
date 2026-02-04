import { ChatInput } from "../chat/ChatInput";
export function EmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-center ">
      <h1 className="text-4xl ml-4 text-white font-semibold">
        Porozmawiajmy o fotografii...
      </h1>
      <div className="sticky">
        <ChatInput />
      </div>
    </div>
  );
}
