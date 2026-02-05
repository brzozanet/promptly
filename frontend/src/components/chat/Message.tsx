import type { Message } from "@/types/chat";
import { Typewriter } from "react-simple-typewriter";
import iconPromptly from "../../assets/icon-promptly.svg";
import iconClock8 from "../../assets/icon-clock8.svg";
import iconUser from "../../assets/icon-user.svg";

interface MessageProps extends Message {
  isLastMessage?: boolean;
}

export function Message({
  role,
  content,
  timestamp,
  isLastMessage,
}: MessageProps) {
  const isUser = role === "user";
  const avatar = isUser ? iconUser : iconPromptly;

  return (
    <div
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <img
          src={avatar}
          alt="assistant"
          title="assistant"
          className="h-8 w-8 rounded-full invert"
        />
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
          isUser
            ? "bg-linear-to-r from-gray-600 via-gray-650 to-gray-600 text-primary-foreground"
            : "bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-foreground"
        }`}
      >
        <div className="whitespace-pre-wrap text-left mb-3 text-base">
          {!isUser && isLastMessage ? (
            <Typewriter
              words={[content]}
              typeSpeed={10}
              deleteSpeed={0}
              loop={1}
              cursor={false}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <img
            src={iconClock8}
            alt="timestamp"
            title="timestamp"
            className={`h-4 ${isUser && "invert"}`}
          />
          <p className="text-[11px] whitespace-pre-wrap text-left">
            {timestamp}
          </p>
        </div>
      </div>
      {isUser && (
        <img
          src={avatar}
          alt="user"
          title="user"
          className="h-8 w-8 rounded-full invert"
        />
      )}
    </div>
  );
}
