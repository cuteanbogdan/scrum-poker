import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatMessage, ChatProps } from "@/types/chat";
import socketService from "@/lib/socket";

const Chat: React.FC<ChatProps> = ({ roomId, userName, messages }) => {
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      socketService.emit("sendMessage", { roomId, user: userName, message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
