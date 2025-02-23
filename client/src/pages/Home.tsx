import { CreateButton } from "../components/JoinButton"

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='text-4xl font-bold'>Welcome to WebRTC with socketio</h1>
            <CreateButton/>
        </div>
    )
}