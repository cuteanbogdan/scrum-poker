import React from "react";
import VoteButton from "./VoteButton";

interface VoteOptionsProps {
  onVote: (value: number) => void;
  activeVote: number | null;
}

const VoteOptions: React.FC<VoteOptionsProps> = ({ onVote, activeVote }) => {
  const options = Array.from({ length: 30 }, (_, i) => (i + 1) * 0.5);

  return (
    <div className="flex justify-center items-center overflow-x-auto gap-2 mt-4 p-4 bg-gray-100 rounded-lg">
      {options.map((option) => (
        <VoteButton
          key={option}
          value={option}
          onVote={onVote}
          isActive={activeVote === option}
          className="py-1 px-2 text-sm"
        />
      ))}
    </div>
  );
};

export default VoteOptions;
