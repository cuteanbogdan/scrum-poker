import { Server as NetServer, IncomingMessage, ServerResponse } from "http";
import { Server as SocketServer } from "socket.io";
import { NextApiResponse } from "next";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketServer;
    };
  };
};
