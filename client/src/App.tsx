import React, { useEffect } from 'react';
import './App.css';
import socketIO from 'socket.io-client'

const WS = "http://localhost:9000";

function App() {
  useEffect(() => {
    socketIO(WS);
  }, []);

  return (
    <div className="App">
       <button> Start new meeting</button>
    </div>
  );
}

export default App;
