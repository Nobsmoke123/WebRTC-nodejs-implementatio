import SocketIO from 'socket.io-client';
import { createContext, useEffect } from 'react';


const WS = "http://localhost:9000";

export const RoomContext = createContext<null | any>(null);

const ws = SocketIO(WS);;

export const RoomProvider: React.FC<any>  = ({ children }) => {  
    useEffect(() => {
        ws.on("room-created", ({ roomId }: { roomId: string}) => {
            console.log('The roomID is: ', roomId);
        });
    }, []);
    return <RoomContext.Provider value={{ ws}}>{ children }</RoomContext.Provider>
 };