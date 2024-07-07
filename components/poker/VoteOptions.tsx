import React from "react";
import VoteButton from "./VoteButton";

interface VoteOptionsProps {
  onVote: (value: number) => void;
  activeVote: number | null;
}

const VoteOptions: React.FC<VoteOptionsProps> = ({ onVote, activeVote }) => {
  const options = Array.from({ length: 30 }, (_, i) => (i + 1) * 0.5);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {options.map((option) => (
        <VoteButton
          key={option}
          value={option}
          onVote={onVote}
          isActive={activeVote === option}
        />
      ))}
    </div>
  );
};

export default VoteOptions;
