import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext";

export const Room = () => {
    const { id } = useParams();

    const { ws, me} = useContext(RoomContext);

    useEffect(() => {
        console.log('Joining room', id);
       if(me) ws.emit('join-room', { roomId: id, peerId: me._id });
    }, [id, me, ws]);

    return (
        <div>
            <h1>Room ID:</h1>
            <span>{id}</span>
        </div>
    )
}