import React from "react";

interface HeaderProps {
  roomId: string;
  usersNumber: number;
}

const Header: React.FC<HeaderProps> = ({ roomId, usersNumber }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-t-lg">
      <h1 className="text-2xl font-bold">Scrum Poker - Room: {roomId}</h1>
      <h1 className="text-2xl font-bold">Users: {usersNumber}</h1>
    </div>
  );
};

export default Header;
