import SocketIO from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as uuidV4 } from 'uuid';


const WS = "http://localhost:9000";

export const RoomContext = createContext<null | any>(null);

const ws = SocketIO(WS);;

export const RoomProvider: React.FC<any>  = ({ children }) => {  

    const navigate = useNavigate();

    const [me, setMe] = useState<Peer>();

    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log(participants);
    };

    useEffect(() => {
        const peerId = uuidV4();
        const peer = new Peer(peerId);
        setMe(peer);

        ws.on("room-created", ({ roomId }: { roomId: string}) => {
            console.log('The roomID is: ', roomId);
            navigate(`/room/${roomId}`);
        });

        ws.on("get-users", getUsers);
    }, []);
    return <RoomContext.Provider value={{ ws, me}}>{ children }</RoomContext.Provider>
 };