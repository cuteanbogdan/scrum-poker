"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/poker/Header";
import VoteOptions from "@/components/poker/VoteOptions";
import VotesDisplay from "@/components/poker/VotesDisplay";
import ResultDisplay from "@/components/poker/ResultDisplay";
import Table from "@/components/poker/Table";
import Footer from "@/components/common/Footer";
import io from "socket.io-client";

const RoomPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [activeVote, setActiveVote] = useState<number | null>(null);

  useEffect(() => {
    const socket = io();

    socket.emit("joinRoom", roomId);

    socket.on("voteReceived", (data: { user: string; vote: number }) => {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [data.user]: data.vote,
      }));
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.disconnect();
    };
  }, [roomId]);

  const handleVote = (vote: number) => {
    // Send vote to server
    // Assuming "user" is a unique identifier for the current user
    const user = "User1";
    const socket = io();
    socket.emit("vote", { room: roomId, user, vote });
    setActiveVote(vote);
  };

  const results = Object.values(votes);
  const users = Object.keys(votes);

  return (
    <div className="flex flex-col min-h-screen">
      <Header roomId={roomId as string} />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Table message="Scrum Poker" users={users} />
        <VotesDisplay votes={votes} />
        <ResultDisplay results={results} />
      </div>
      <VoteOptions onVote={handleVote} activeVote={activeVote} />
      <Footer />
    </div>
  );
};

export default RoomPage;
