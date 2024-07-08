"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/poker/Header";
import VoteOptions from "@/components/poker/VoteOptions";
import VotesDisplay from "@/components/poker/VotesDisplay";
import ResultDisplay from "@/components/poker/ResultDisplay";
import Table from "@/components/poker/Table";
import Footer from "@/components/common/Footer";
import socketService from "@/lib/socket";

const RoomPage = () => {
  const { roomId } = useParams() as { roomId: string };

  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [activeVote, setActiveVote] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>(
    () => `User_${Math.floor(Math.random() * 1000)}`
  );
  const [users, setUsers] = useState<string[]>([]);
  const [votesRevealed, setVotesRevealed] = useState<boolean>(false);

  useEffect(() => {
    const socket = socketService.connect();

    socket.emit("joinRoom", { roomId, userName });

    socketService.on("voteReceived", (data: { user: string; vote: number }) => {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [data.user]: data.vote,
      }));
    });

    socketService.on(
      "roomData",
      (roomData: { users: { id: string; name: string }[] }) => {
        const userNames = roomData.users.map((user) => user.name);
        setUsers(userNames);
      }
    );

    socketService.on("votesRevealed", () => {
      setVotesRevealed(true);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socketService.disconnect();
    };
  }, [roomId, userName]);

  const handleVote = (vote: number) => {
    socketService.emit("vote", { room: roomId, user: userName, vote });
    setActiveVote(vote);
  };

  const handleRevealVotes = () => {
    socketService.emit("revealVotes", roomId);
  };

  const results = Object.values(votes);
  const userVotes = Object.keys(votes);

  return (
    <div className="flex flex-col min-h-screen">
      <Header roomId={roomId} usersNumber={users.length} />
      <div className="flex flex-1 mt-8">
        <div className="flex flex-col items-center justify-start w-1/3 p-4">
          {votesRevealed && <VotesDisplay votes={votes} />}
          {votesRevealed && <ResultDisplay results={results} />}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center w-1/3">
          <Table
            message={
              userVotes.length === 0
                ? "Pick your vote!"
                : votesRevealed
                ? "Great Job!"
                : ""
            }
            users={users}
            showRevealButton={userVotes.length > 0 && !votesRevealed}
            onRevealVotes={handleRevealVotes}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-start w-1/3 p-4">
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            <div className="flex-1 w-full bg-white p-4 rounded-lg shadow">
              Continut chat
            </div>
          </div>
        </div>
      </div>
      <VoteOptions onVote={handleVote} activeVote={activeVote} />
      <Footer />
    </div>
  );
};

export default RoomPage;
