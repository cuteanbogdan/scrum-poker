import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface UserProps {
  name: string;
}

const User: React.FC<UserProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center w-30 h-25 bg-blue-400 shadow-lg rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white mb-4">
        <FontAwesomeIcon icon={faUser} size="2x" />
      </div>
      <div className="text-center text-xl font-semibold text-gray-800">
        {name}
      </div>
    </div>
  );
};

export default User;
