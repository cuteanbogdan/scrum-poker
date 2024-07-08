import React from "react";
import VoteButton from "./VoteButton";

interface VoteOptionsProps {
  onVote: (vote: number) => void;
  activeVote: number | null;
  votesRevealed: boolean;
}

const VoteOptions: React.FC<VoteOptionsProps> = ({
  onVote,
  activeVote,
  votesRevealed,
}) => {
  const voteValues = Array.from({ length: 30 }, (_, i) => (i + 1) * 0.5);

  return (
    <div className="flex justify-center items-center overflow-x-auto gap-2 mt-4 p-4 bg-gray-100 rounded-lg">
      {voteValues.map((value) => (
        <button
          key={value}
          onClick={() => onVote(value)}
          disabled={votesRevealed}
          className={`p-2 rounded ${
            activeVote === value ? "bg-green-500" : "bg-blue-500"
          } text-white`}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default VoteOptions;
