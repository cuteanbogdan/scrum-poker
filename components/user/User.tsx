import React from "react";

interface UserProps {
  name: string;
}

const User: React.FC<UserProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white">
      {name}
    </div>
  );
};

export default User;
