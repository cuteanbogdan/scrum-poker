import { Server as ServerIO, Socket } from "socket.io";
import { rooms } from "./common/roomData";

const votingHandler = (io: ServerIO) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Voting connected: ${socket.id}`);

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
  });
};

export default votingHandler;
