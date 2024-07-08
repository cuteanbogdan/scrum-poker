import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";

interface UserProps {
  name: string;
  hasVoted: boolean;
  vote?: number;
  votesRevealed: boolean;
}

const User: React.FC<UserProps> = ({ name, hasVoted, vote, votesRevealed }) => {
  return (
    <div className="flex flex-col items-center justify-center w-20 h-25 p-1">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white mb-4">
        {votesRevealed ? (
          <span className="text-2xl">{vote}</span>
        ) : hasVoted ? (
          <FontAwesomeIcon icon={faCheck} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faUser} size="2x" />
        )}
      </div>
      <div className="text-center text-xl font-semibold text-gray-800">
        {name}
      </div>
    </div>
  );
};

export default User;
