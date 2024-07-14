import React from "react";
import { ChatMessagesProps } from "@/types/chat";

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 w-full bg-white p-4 rounded-lg shadow overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <strong>{msg.user}</strong>: {msg.message}{" "}
          <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
