import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useRef } from 'react';
const SocketIOComponent = () => {
  const [message, setMessage] = useState('');
  const [toggleLive, setToggleLive] = useState(false);
  const socket = useRef(null);

  
  useEffect(() => {
    socket.current = io('http://localhost:4000', {
      withCredentials: true,  
    });
    const usernamee = "yas";
const typee = "gur";


socket.current.emit('comm', { usernamee, typee });
socket.current.on('comm',({usernamee,typee})=>{
    console.log(usernamee+typee)
})
    socket.current.on('user connected',({username,type})=>{
        console.log(username+ type)
    })
    socket.current.on('message', (data) => {
      setMessage(data);
    });

    return () => {
        socket.current.on('user disconnected',({username,type})=>{
                console.log("disconnecte")
                console.log(username,type)
        })
      socket.current.disconnect();
    };
  }, []);

  const handleToggleState = () => {
    setToggleLive(!toggleLive);
    socket.current.emit('message', toggleLive ? 'Switch to work mode' : 'Switch to live mode');
  };

  return (
    <div>
      <h1>Socket.IO in React</h1>
      <p>{message}</p>
      <button onClick={handleToggleState}>
        {toggleLive ? 'Switch to Work Mode' : 'Switch to Live Mode'}
      </button>
    </div>
  );
};

export default SocketIOComponent;
