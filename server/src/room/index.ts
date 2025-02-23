import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoom {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ roomId, peerId }: IRoom) => {
    if (rooms[roomId]) {
      console.log("User joined a room with ID: ", roomId, peerId);
      socket.join(roomId);
      rooms[roomId].push(peerId);
      //   console.log("emit to room");
      //   socket.emit("get-users", {
      //     roomId,
      //     participants: rooms[roomId],
      //   });
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
    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
    console.log("User left the room with ID: ", roomId, peerId);
    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
      console.log("Room deleted: ", roomId);
    }
    socket.to(roomId).emit("user-disconnected", peerId);
  };

  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
    console.log("User created a room.");
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
