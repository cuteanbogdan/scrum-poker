import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io({
        path: "/api/socket",
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;
