import React, { useState } from "react";

interface HeaderProps {
  roomId: string;
  usersNumber: number;
}

const Header: React.FC<HeaderProps> = ({ roomId, usersNumber }) => {
  const [buttonText, setButtonText] = useState("Copy Invite Link");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    const roomLink = `${window.location.origin}/rooms/${roomId}`;
    navigator.clipboard.writeText(roomLink).then(() => {
      setButtonText("Copied!");
      setIsCopied(true);
      setTimeout(() => {
        setButtonText("Copy Invite Link");
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-t-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Scrum Poker - Room: {roomId}</h1>
          <h1 className="text-2xl font-bold">Users: {usersNumber}</h1>
        </div>
        <button
          onClick={handleCopyLink}
          className={`py-2 px-4 rounded transition-colors duration-300 ${
            isCopied
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Header;
