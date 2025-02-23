import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";

export const Room = () => {
    const { id } = useParams();

    const { ws, me, stream } = useContext(RoomContext);

    useEffect(() => {
        console.log('Joining room', id);
       if(me) ws.emit('join-room', { roomId: id, peerId: me._id });
    }, [id, me, ws]);

    return (
        <div>
            <h1>Room ID:</h1>
            <span>{id}</span>
            <VideoPlayer stream={stream}/>
        </div>
    )
}