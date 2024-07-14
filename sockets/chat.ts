import { Server as ServerIO, Socket } from "socket.io";
import { rooms } from "./common/roomData";

type ChatMessage = {
  roomId: string;
  user: string;
  message: string;
  timestamp?: Date;
};

const chatHandler = (io: ServerIO) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Chat connected: ${socket.id}`);

    socket.on("sendMessage", ({ roomId, user, message }: ChatMessage) => {
      const chatMessage: ChatMessage = {
        roomId,
        user,
        message,
        timestamp: new Date(),
      };
      io.to(roomId).emit("receiveMessage", chatMessage);
      console.log(
        `Message received in room ${roomId} from user ${user}: ${message}`
      );
    });

    socket.on("disconnect", () => {
      console.log(`Chat disconnected: ${socket.id}`);
    });
  });
};

export default chatHandler;
