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
      
        socket.current.on("chat-update", (currentchat) => {
          console.log(currentchat);
        
          setchat((prevchat) => [...prevchat, currentchat]);
        });
     
        return () => {
          socket.current.off("chat-update");
        };
      }, []);

    
    const [currenttext, setcurrenttext] = useState("")
    const handleclick=()=>{
        socket.current.emit("chat-sent",{roomName,currenttext,username,type})
        setcurrenttext("")
    }

  return (
    <div className='  bg-black  w-screen h-full xl:w-full max-h-[50vh] overflow-y-hidden '>
        <div className=' flex flex-row sticky top-0'>
            <input type="text" onChange={(e)=>{setcurrenttext(e.target.value)}} placeholder='Chat now' value={currenttext} className='bg-gradient-to-r from-gray-800  to-gray-900 text-white outline-none  h-full w-full p-3 ' />
            <button onClick={handleclick} className='bg-[#726fff] rounded-md pl-4 pr-4 hover:bg-[#5c5ac2] text-white '>
              
                Send
            </button>
        </div>
        <div className="w-full flex flex-col space-y-4 p-4 h-screen overflow-scroll custom-scrollbar bg-purple-900">
  {chat.length > 1 ? (
    chat.slice(1,chat.length).reverse().map((message, index) => (
      <div
        key={index}
        className="flex flex-col p-3 rounded-lg shadow-md w-full text-white transition-all duration-300 ease-in-out bg-slate-800"
      >
        <div className="flex justify-between text-xs mb-2">
          <span className="font-semibold pr-4">{message.name}</span>
          <span className="text-xs text-gray-400 capitalize">{message.type}</span>
        </div>
        <p className="text-sm">{message.text}</p>
      </div>
    ))
  ) : (
    <div className="flex justify-center items-center h-full text-gray-400 text-lg">
      No messages yet. Start the conversation!
    </div>
  )}
</div>



    </div>
  )
}

export default Chat