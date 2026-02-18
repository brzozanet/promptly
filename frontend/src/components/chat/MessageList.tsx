import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { useChatStore } from "@/store/chatStore";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const endRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const day = date.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${time}, ${day}`;
  };

  const truncateTitleByWords = (text: string, maxWords: number) => {
    const words = text.trim().split(/\s+/);
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <h2 className="text-white text-2xl text-left mb-6">
        {truncateTitleByWords(messages[0]?.content ?? "", 5)}
      </h2>
      <ul className="space-y-4 px-4 mb-12">
        {messages.map((message) => (
          <li key={message.id}>
            <Message
              id={message.id}
              role={message.role}
              content={message.content}
              timestamp={formatTimestamp(message.timestamp)}
            />
          </li>
        ))}
      </ul>
      <div ref={endRef} />
    </>
  );
}

// TODO:
// Zrób funkcję, która:
// 1. rozbije tekst np. const parts = message.content.split("fotowarsztaty.com");
// 2. wyrenderuje parts[0], potem <a href="https://fotowarsztaty.com" target="_blank" rel="noreferrer">fotowarsztaty.com</a>, a potem parts[1].
// W ten sposób fragment fotowarsztaty.com w tekście zostanie zastąpiony komponentem <a>, a reszta treści pozostanie niezmieniona.
