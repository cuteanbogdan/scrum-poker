import { Server as ServerIO, Socket } from "socket.io";

type RoomData = {
  users: { id: string; name: string }[];
  votes: { [key: string]: number };
  revealVotes: boolean;
};

const rooms: { [key: string]: RoomData } = {};

const votingHandler = (io: ServerIO) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Voting connected: ${socket.id}`);

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

    socket.on("vote", (data: { room: string; user: string; vote: number }) => {
      const { room, user, vote } = data;
      if (rooms[room]) {
        rooms[room].votes[user] = vote;
        io.to(room).emit("voteReceived", { user, vote });
        console.log(`Vote received in room ${room} from user ${user}: ${vote}`);
      }
    });

    socket.on("revealVotes", (roomId: string) => {
      if (rooms[roomId]) {
        rooms[roomId].revealVotes = true;
        io.to(roomId).emit("votesRevealed");
        console.log(`Votes revealed in room ${roomId}`);
      }
    });

    socket.on("resetRound", (roomId: string) => {
      if (rooms[roomId]) {
        rooms[roomId].votes = {};
        rooms[roomId].revealVotes = false;
        io.to(roomId).emit("roundReset");
        console.log(`Round reset in room ${roomId}`);
      }
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

export default votingHandler;
