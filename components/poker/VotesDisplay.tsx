import React from "react";

interface VotesDisplayProps {
  votes: { [key: string]: number };
}

const VotesDisplay: React.FC<VotesDisplayProps> = ({ votes }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Votes:</h2>
      <ul>
        {Object.entries(votes).map(([user, vote], index) => (
          <li key={index} className="py-1">
            {user}: {vote}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotesDisplay;
