import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatProps } from "@/types/chat";
import socketService from "@/lib/socket";

const Chat: React.FC<ChatProps> = ({ roomId, userName, messages }) => {
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      socketService.emit("sendMessage", { roomId, user: userName, message });
    }
  };

  return (
    <div className="min-h-[60vh] max-h-[60vh] items-center justify-center flex flex-col w-96 mx-auto bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
