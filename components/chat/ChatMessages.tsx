import React, { useEffect, useRef } from "react";
import { ChatMessagesProps } from "@/types/chat";

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 w-full bg-gray-100 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="mb-2 p-2 bg-white rounded shadow-sm break-words"
        >
          <strong className="text-blue-600">{msg.user}</strong>:{" "}
          <span className="break-words">{msg.message}</span>{" "}
          <em className="text-gray-500 text-sm">
            (
            {new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            )
          </em>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
