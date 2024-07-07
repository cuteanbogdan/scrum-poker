// app/rooms/[roomId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/poker/Header";
import VoteOptions from "@/components/poker/VoteOptions";
import VotesDisplay from "@/components/poker/VotesDisplay";
import ResultDisplay from "@/components/poker/ResultDisplay";
import Footer from "@/components/common/Footer";
import io from "socket.io-client";

const RoomPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [results, setResults] = useState<number[]>([]);
  const [activeVote, setActiveVote] = useState<number | null>(null);

  // useEffect(() => {
  //   const socket = io();

  //   socket.emit("joinRoom", roomId);

  //   socket.on("voteReceived", (data: { user: string; vote: number }) => {
  //     setVotes((prevVotes) => ({
  //       ...prevVotes,
  //       [data.user]: data.vote,
  //     }));
  //   });

  //   return () => {
  //     socket.emit("leaveRoom", roomId);
  //     socket.disconnect();
  //   };
  // }, [roomId]);

  const handleVote = (vote: number) => {
    // Send vote to server
    // Assuming "user" is a unique identifier for the current user
    const user = "User1";
    const socket = io();
    socket.emit("vote", { room: roomId, user, vote });
    setActiveVote(vote);
  };

  return (
    <div className="container mx-auto p-4">
      <Header roomId={roomId as string} />
      <VoteOptions onVote={handleVote} activeVote={activeVote} />
      <VotesDisplay votes={votes} />
      <ResultDisplay results={results} />
      <Footer />
    </div>
  );
};

export default RoomPage;
