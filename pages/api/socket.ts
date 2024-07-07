import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

type RoomData = {
  users: string[];
  votes: { [key: string]: number };
};

const rooms: { [key: string]: RoomData } = {};

const handler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`New connection: ${socket.id}`);

      socket.on("joinRoom", (roomId: string) => {
        if (!rooms[roomId]) {
          rooms[roomId] = { users: [], votes: {} };
          console.log(`Room created: ${roomId}`);
        }
        rooms[roomId].users.push(socket.id);
        socket.join(roomId);
        io.to(roomId).emit("roomData", rooms[roomId]);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
        console.log(
          `Current users in room ${roomId}: ${rooms[roomId].users.join(", ")}`
        );
      });

      socket.on("leaveRoom", (roomId: string) => {
        if (rooms[roomId]) {
          rooms[roomId].users = rooms[roomId].users.filter(
            (id) => id !== socket.id
          );
          if (rooms[roomId].users.length === 0) {
            delete rooms[roomId];
            console.log(`Room deleted: ${roomId}`);
          } else {
            io.to(roomId).emit("roomData", rooms[roomId]);
            console.log(`Socket ${socket.id} left room ${roomId}`);
            console.log(
              `Current users in room ${roomId}: ${rooms[roomId].users.join(
                ", "
              )}`
            );
          }
        }
        socket.leave(roomId);
      });

      socket.on(
        "vote",
        (data: { room: string; user: string; vote: number }) => {
          const { room, user, vote } = data;
          if (rooms[room]) {
            rooms[room].votes[user] = vote;
            io.to(room).emit("voteReceived", { user, vote });
            console.log(
              `Vote received in room ${room} from user ${user}: ${vote}`
            );
          }
        }
      );

      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
        for (const roomId in rooms) {
          if (rooms.hasOwnProperty(roomId)) {
            rooms[roomId].users = rooms[roomId].users.filter(
              (id) => id !== socket.id
            );
            if (rooms[roomId].users.length === 0) {
              delete rooms[roomId];
              console.log(`Room deleted: ${roomId}`);
            } else {
              io.to(roomId).emit("roomData", rooms[roomId]);
              console.log(`Socket ${socket.id} removed from room ${roomId}`);
              console.log(
                `Current users in room ${roomId}: ${rooms[roomId].users.join(
                  ", "
                )}`
              );
            }
          }
        }
      });
    });

    console.log("Socket.IO server setup complete");
  } else {
    console.log("Socket.IO server already set up");
  }

  res.end();
};

export default handler;
