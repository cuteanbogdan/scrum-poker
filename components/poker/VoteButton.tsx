import React from "react";

interface VoteButtonProps {
  value: number;
  onVote: (value: number) => void;
  isActive: boolean;
  className?: string;
}

const VoteButton: React.FC<VoteButtonProps> = ({
  value,
  onVote,
  isActive,
  className,
}) => {
  return (
    <button
      className={`
        border rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300
        ${isActive ? "bg-blue-500 text-white" : "bg-gray-200"}
        ${className || ""}
      `}
      onClick={() => onVote(value)}
    >
      {value}
    </button>
  );
};

export default VoteButton;
