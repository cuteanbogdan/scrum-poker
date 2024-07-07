import React from "react";

interface VoteButtonProps {
  value: number;
  onVote: (value: number) => void;
  isActive: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ value, onVote, isActive }) => {
  return (
    <button
      className={`py-2 px-4 border rounded ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200"
      } hover:bg-blue-600 transition-colors duration-300`}
      onClick={() => onVote(value)}
    >
      {value}
    </button>
  );
};

export default VoteButton;
