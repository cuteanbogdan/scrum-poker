export type RoomData = {
  users: { id: string; name: string }[];
  votes: { [key: string]: number };
  revealVotes: boolean;
};

export const rooms: { [key: string]: RoomData } = {};
