import React from "react";
import User from "../user/User";

interface TableProps {
  message: string;
  users: string[];
  showRevealButton: boolean;
  onRevealVotes: () => void;
}

const Table: React.FC<TableProps> = ({
  message,
  users,
  showRevealButton,
  onRevealVotes,
}) => {
  const gridSize = 3;
  const totalCells = gridSize * gridSize;
  const centerIndex = Math.floor(totalCells / 2);

  const numUsersPerCell = Math.ceil(users.length / (totalCells - 1));

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
      {Array.from({ length: totalCells }).map((_, index) => {
        if (index === centerIndex) {
          return (
            <div
              key={index}
              className="flex items-center justify-center bg-blue-200 rounded-[10%] h-full col-span-1 row-span-1"
            >
              {showRevealButton ? (
                <button
                  onClick={onRevealVotes}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Reveal Votes
                </button>
              ) : (
                <div className="text-xl font-bold text-center">{message}</div>
              )}
            </div>
          );
        } else {
          const userIndex =
            (index < centerIndex ? index : index - 1) * numUsersPerCell;
          const cellUsers = users.slice(userIndex, userIndex + numUsersPerCell);

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center h-full space-y-2"
            >
              {cellUsers.map((user, userIndex) => (
                <User key={userIndex} name={user} />
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Table;
