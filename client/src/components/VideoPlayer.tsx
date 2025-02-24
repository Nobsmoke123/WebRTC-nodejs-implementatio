import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{stream: MediaStream}> = ({stream}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        videoRef.current!.srcObject = stream;
    }, [stream]);
    return (<video ref={videoRef} autoPlay playsInline />);
}