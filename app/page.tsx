"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";
import router from "next/router";

const isValidUUIDv4 = (uuid: string) =>
  uuidValidate(uuid) && uuidVersion(uuid) === 4;

const HomePage: React.FC = () => {
  const [room, setRoom] = useState<string>("");
  const router = useRouter();

  const handleJoin = () => {
    if (room && isValidUUIDv4(room)) {
      router.push(`/rooms/${room}`);
    } else {
      alert("Please enter a valid Room ID.");
    }
  };

  const handleCreate = () => {
    const roomId = uuidv4();
    router.push(`/rooms/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-lg p-6 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-gray-800">
              Welcome to Scrum Poker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg text-gray-600">
              Scrum Poker is a tool for agile teams to estimate task effort
              using poker card voting. Enhance collaboration and accuracy in
              your project planning.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg p-6 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-gray-800">
              Join or Create a Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <Button
                onClick={handleJoin}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Join Room
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Create a New Room
            </h2>
            <Button
              onClick={handleCreate}
              className="w-full max-w-xs bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Create Room
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
