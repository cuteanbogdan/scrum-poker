import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import votingHandler from "@/sockets/voting";

const handler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    votingHandler(io);

    console.log("Socket.IO server setup complete");
  } else {
    console.log("Socket.IO server already set up");
  }

  res.end();
};

export default handler;
