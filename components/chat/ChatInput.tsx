import React, { useState } from "react";
import { ChatInputProps } from "@/types/chat";

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className="w-full mt-4 flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-l-lg"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
