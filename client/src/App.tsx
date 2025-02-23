import './App.css'
import { CreateButton } from './components/JoinButton';


function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className='text-4xl font-bold'>Welcome to WebRTC with socketio</h1>
        <CreateButton/>
      </div>
    </>
  )
}

export default App
