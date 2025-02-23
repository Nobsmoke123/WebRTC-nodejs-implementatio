import React from "react";
import { RoomContext } from "../context/RoomContext";

export const CreateButton: React.FC = () => {
    const {ws} = React.useContext(RoomContext);

    const createRoom = () => {
        ws.emit('create-room');
    }
    return (
        <button onClick={createRoom} className='bg-green-950 px-8 py-2 rounded-lg text-xl hover:bg-green-600 text-white'>
          Start Meeting
        </button>
    );
 };