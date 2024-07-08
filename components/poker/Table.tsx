import React from "react";
import User from "../user/User";

interface TableProps {
  message: string;
  users: string[];
}

const Table: React.FC<TableProps> = ({ message, users }) => {
  const gridSize = 3;
  const totalCells = gridSize * gridSize;
  const centerIndex = Math.floor(totalCells / 2);

  const numUsersPerCell = Math.ceil(users.length / (totalCells - 1));

  return (
    <div
      className={`grid grid-cols-${gridSize} grid-rows-${gridSize} gap-4 w-full h-full`}
    >
      {Array.from({ length: totalCells }).map((_, index) => {
        if (index === centerIndex) {
          return (
            <div
              key={index}
              className="flex items-center justify-center bg-blue-200 rounded-[10%] h-full col-span-1 row-span-1"
            >
              <div className="text-xl font-bold text-center">{message}</div>
            </div>
          );
        } else {
          const startIdx =
            (index < centerIndex ? index : index - 1) * numUsersPerCell;
          const endIdx = startIdx + numUsersPerCell;
          const cellUsers = users.slice(startIdx, endIdx);

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
