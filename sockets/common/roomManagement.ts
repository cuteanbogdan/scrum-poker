import { Server as ServerIO, Socket } from "socket.io";
import { rooms } from "./roomData";

const roomManagement = (io: ServerIO) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on(
      "joinRoom",
      ({ roomId, userName }: { roomId: string; userName: string }) => {
        if (!rooms[roomId]) {
          rooms[roomId] = { users: [], votes: {}, revealVotes: false };
          console.log(`Room created: ${roomId}`);
        }
        rooms[roomId].users.push({ id: socket.id, name: userName });
        socket.join(roomId);
        io.to(roomId).emit("roomData", rooms[roomId]);
        console.log(`Socket ${socket.id} (${userName}) joined room ${roomId}`);
        console.log(
          `Current users in room ${roomId}: ${rooms[roomId].users
            .map((user) => user.name)
            .join(", ")}`
        );
      }
    );

    socket.on("leaveRoom", (roomId: string) => {
      if (rooms[roomId]) {
        rooms[roomId].users = rooms[roomId].users.filter(
          (user) => user.id !== socket.id
        );
        if (rooms[roomId].users.length === 0) {
          delete rooms[roomId];
          console.log(`Room deleted: ${roomId}`);
        } else {
          io.to(roomId).emit("roomData", rooms[roomId]);
          console.log(`Socket ${socket.id} left room ${roomId}`);
          console.log(
            `Current users in room ${roomId}: ${rooms[roomId].users
              .map((user) => user.name)
              .join(", ")}`
          );
        }
      }
      socket.leave(roomId);
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
      for (const roomId in rooms) {
        if (rooms.hasOwnProperty(roomId)) {
          rooms[roomId].users = rooms[roomId].users.filter(
            (user) => user.id !== socket.id
          );
          if (rooms[roomId].users.length === 0) {
            delete rooms[roomId];
            console.log(`Room deleted: ${roomId}`);
          } else {
            io.to(roomId).emit("roomData", rooms[roomId]);
            console.log(`Socket ${socket.id} removed from room ${roomId}`);
            console.log(
              `Current users in room ${roomId}: ${rooms[roomId].users
                .map((user) => user.name)
                .join(", ")}`
            );
          }
        }
      }
    });
  });
};

export default roomManagement;
