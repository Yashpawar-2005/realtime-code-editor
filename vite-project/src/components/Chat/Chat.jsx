import React, { useEffect, useState } from 'react'
import { sendimage } from '../../constants.js'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { role } from '../../atoms.js';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { userdata } from '../../atoms.js';
const Chat = () => {
    const socket = useRef(null);
    const {user}=userdata();
    const username=user.username
    const rolee=useRecoilValue(role)
    
    const type=rolee
    const [chat,setchat]=useState([{}])
    const {roomname:roomName}=useParams()
    useEffect(() => {
        socket.current = io('http://localhost:4000', {
       withCredentials: true,
         });
        socket.current.emit("join-room",roomName);
        return () => {
          socket.current.disconnect();
        };
      }, []);
    useEffect(() => {
    socket.current.on("chat-update",(currentchat)=>{
        console.log(currentchat)
        setchat(prevChat => [...prevChat,currentchat]);

    })
    console.log(chat)
      return () => {
       
      }
    }, [chat,setchat])
    
    const [currenttext, setcurrenttext] = useState("")
    const handleclick=()=>{
        socket.current.emit("chat-sent",{roomName,currenttext,username,type})
        setcurrenttext("")
    }

  return (
    <div className='  bg-purple-950  w-screen h-full xl:w-full max-h-[50vh] overflow-y-scroll custom-scrollbar '>
        <div className=' flex flex-row sticky top-0'>
            <input type="text" onChange={(e)=>{setcurrenttext(e.target.value)}} placeholder='Chat now' value={currenttext} className='bg-gradient-to-r from-gray-800  to-gray-900 text-white outline-none rounded-lg h-full w-full p-3 ' />
            <button onClick={handleclick} className='bg-[#726fff] rounded-2xl pl-4 pr-4 hover:bg-[#5c5ac2] text-white '>
              
                Send
            </button>
        </div>
        <div className="w-full flex flex-col space-y-4 p-4 max-h-screen overflow-auto">
  {chat.slice().reverse().map((message, index) => (
    <div key={index} className="flex justify-between items-start space-x-4">
   
      <div
        className={`flex flex-col p-4 rounded-lg max-w-[80%] text-white ${
          message.type === 'user' ? 'bg-blue-500' : 'bg-gray-800'
        }`}
      >
  
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">{message.name}</span>
          <span className="text-xs text-gray-400">{message.type}</span>
        </div>

        <p className="text-lg">{message.text}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Chat