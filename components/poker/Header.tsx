import React from "react";

interface HeaderProps {
  roomId: string;
}

const Header: React.FC<HeaderProps> = ({ roomId }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-t-lg">
      <h1 className="text-2xl font-bold">Scrum Poker - Room: {roomId}</h1>
    </div>
  );
};

export default Header;
