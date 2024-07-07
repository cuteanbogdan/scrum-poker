import React from "react";
import User from "../user/User";

interface TableProps {
  message: string;
  users: string[];
}

const Table: React.FC<TableProps> = ({ message, users }) => {
  return (
    <div className="relative w-96 h-48 bg-blue-200 rounded-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-center">
        {message}
      </div>
      {users.map((user, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            transform: `rotate(${
              (index / users.length) * 360
            }deg) translate(100px) rotate(-${(index / users.length) * 360}deg)`,
          }}
        >
          <User name={user} />
        </div>
      ))}
    </div>
  );
};

export default Table;
