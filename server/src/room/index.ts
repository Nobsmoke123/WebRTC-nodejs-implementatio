import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, Set<string>> = {};

interface IRoom {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ roomId, peerId }: IRoom) => {
    if (rooms[roomId] !== undefined && rooms[roomId].has(peerId) === false) {
      socket.join(roomId);
      rooms[roomId].add(peerId);
      console.log("User joined a room with ID: ", roomId, peerId);
      console.log(rooms[roomId]);
      console.log("emit to room");
      socket.emit("get-users", {
        roomId,
        participants: Array.from(rooms[roomId]),
      });
    } else {
      console.log("Room not found");
    }

    socket.on("disconnect", () => {
      console.log("User left the chat!", peerId);
      leaveRoom(roomId, peerId);
    });
  };

  const leaveRoom = (roomId: string, peerId: string) => {
    if (rooms[roomId] === undefined) return;
    rooms[roomId].delete(peerId);
    console.log("User left the room with ID: ", roomId, peerId);
    // if (rooms[roomId].size === 0) {
    //   delete rooms[roomId];
    //   console.log("Room deleted: ", roomId);
    // }
    socket.to(roomId).emit("user-disconnected", peerId);
  };

  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = new Set();
    socket.emit("room-created", { roomId });
    console.log("User created a room with ID: ", roomId);
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
