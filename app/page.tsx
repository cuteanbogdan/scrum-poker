"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const HomePage: React.FC = () => {
  const [room, setRoom] = useState<string>("");
  const router = useRouter();

  const handleJoin = () => {
    if (room) {
      router.push(`/rooms/${room}`);
    }
  };

  const handleCreate = () => {
    // Generate a unique room ID or use the newRoom value as room ID
    const roomId = "to implement";
    router.push(`/rooms/${roomId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Scrum Poker
          </h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <button
              onClick={handleJoin}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Join Room
            </button>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Create a New Room
            </h2>
            <button
              onClick={handleCreate}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Create Room
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
