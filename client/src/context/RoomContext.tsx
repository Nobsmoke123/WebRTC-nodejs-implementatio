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

    const [stream, setStream] = useState<MediaStream>();

    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log("Participants: ");
        console.log(participants);
    };

    const enterRoom = ({ roomId }: { roomId: string}) => {
        console.log({roomId});
        navigate(`/room/${roomId}`);
    };

    useEffect(() => {
        const peerId = uuidV4();

        const peer = new Peer(peerId);

        setMe(peer);

        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream); 
            }
            );
        } catch (error) {
            console.log(error);
        }

        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers);
    }, []);

    useEffect(() => {
        if(me && stream) {
            ws.on("user-joined", ({ peerId }) => {
                const call = me.call(peerId, stream);
            });

            ws.on("call", (call) => {
                call.answer(stream);
            })
        }
    }, [me, stream]);

    return <RoomContext.Provider value={{ ws, me, stream}}>{ children }</RoomContext.Provider>
 };