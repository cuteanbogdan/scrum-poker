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
        console.log("Room data received:", roomData);
      }
    );

    return () => {
      socket.emit("leaveRoom", roomId);
      socketService.disconnect();
    };
  }, [roomId, userName]);

  const handleVote = (vote: number) => {
    socketService.emit("vote", { room: roomId, user: userName, vote });
    setActiveVote(vote);
  };

  const results = Object.values(votes);
  const users = Object.keys(votes);

  console.log("Current users:", users);

  return (
    <div className="flex flex-col min-h-screen">
      <Header roomId={roomId} />
      <div className="flex flex-1 flex-col items-center justify-center mt-8">
        <Table message="Scrum Poker" users={users} />
        <VotesDisplay votes={votes} />
        <ResultDisplay results={results} />
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4">
        <VoteOptions onVote={handleVote} activeVote={activeVote} />
        <Footer />
      </div>
    </div>
  );
};

export default RoomPage;
