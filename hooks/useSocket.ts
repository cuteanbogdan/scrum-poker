import { useEffect } from "react";
import socketService from "@/lib/socket";
import { ChatMessage } from "@/types/chat";

const useSocket = (
  roomId: string,
  userName: string,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>,
  setVotes: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>,
  setVotesRevealed: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveVote: React.Dispatch<React.SetStateAction<number | null>>
) => {
  useEffect(() => {
    if (!userName) return;

    const socket = socketService.connect();

    socket.emit("joinRoom", { roomId, userName });

    socketService.on(
      "roomData",
      (roomData: { users: { id: string; name: string }[] }) => {
        const userNames = roomData.users.map((user) => user.name);
        setUsers(userNames);
      }
    );

    socketService.on("receiveMessage", (chatMessage: ChatMessage) => {
      setMessages((prevMessages: ChatMessage[]) => [
        ...prevMessages,
        chatMessage,
      ]);
    });

    socketService.on("voteReceived", (data: { user: string; vote: number }) => {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [data.user]: data.vote,
      }));
    });

    socketService.on("votesRevealed", () => {
      setVotesRevealed(true);
    });

    socketService.on("roundReset", () => {
      setVotes({});
      setActiveVote(null);
      setVotesRevealed(false);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      localStorage.removeItem("userName");
      socketService.disconnect();
    };
  }, [roomId, userName, setMessages, setUsers, setVotes, setVotesRevealed]);
};

export default useSocket;
