"use client";

import React, { useState, useEffect } from "react";
import useSocket from "@/hooks/useSocket";
import { useParams } from "next/navigation";
import Header from "@/components/poker/Header";
import VoteOptions from "@/components/poker/VoteOptions";
import VotesDisplay from "@/components/poker/VotesDisplay";
import ResultDisplay from "@/components/poker/ResultDisplay";
import Table from "@/components/poker/Table";
import Footer from "@/components/common/Footer";
import socketService from "@/lib/socket";
import NameModal from "@/components/common/NameModal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Chat from "@/components/chat/Chat";
import { ChatMessage } from "@/types/chat";

const RoomPage = () => {
  const { roomId } = useParams() as { roomId: string };

  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [activeVote, setActiveVote] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [votesRevealed, setVotesRevealed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    setLoading(false);
  }, []);

  useSocket(
    roomId,
    userName || "",
    setMessages,
    setUsers,
    setVotes,
    setVotesRevealed,
    setActiveVote
  );

  const handleVote = (vote: number) => {
    if (!votesRevealed && vote !== activeVote) {
      socketService.emit("vote", { room: roomId, user: userName, vote });
      setActiveVote(vote);
    }
  };

  const handleRevealVotes = () => {
    socketService.emit("revealVotes", roomId);
  };

  const handleResetRound = () => {
    socketService.emit("resetRound", roomId);
  };

  const results = Object.values(votes);
  const userVotes = Object.keys(votes);

  const handleSaveUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!userName && <NameModal onSave={handleSaveUserName} />}
      {userName && (
        <>
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
                votes={votes}
                votesRevealed={votesRevealed}
                showRevealButton={userVotes.length > 0 && !votesRevealed}
                onRevealVotes={handleRevealVotes}
                onResetRound={handleResetRound}
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-start w-1/3 p-4">
              <Chat roomId={roomId} userName={userName} messages={messages} />
            </div>
          </div>
          <VoteOptions
            onVote={handleVote}
            activeVote={activeVote}
            votesRevealed={votesRevealed}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default RoomPage;
