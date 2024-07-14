export interface ChatMessage {
  roomId: string;
  user: string;
  message: string;
  timestamp: Date;
}

export interface ChatProps {
  roomId: string;
  userName: string;
  messages: ChatMessage[];
}

export interface ChatMessagesProps {
  messages: ChatMessage[];
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
}
