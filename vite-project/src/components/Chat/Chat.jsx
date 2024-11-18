import React, { useState } from 'react'
import { sendimage } from '../../constants.js'
const Chat = () => {
    const [currenttext, setcurrenttext] = useState("")
    const handleclick=()=>{
        setcurrenttext("")
    }
  return (
    <div className='  bg-purple-950  w-screen h-full xl:w-full '>
        <div className=' flex flex-row   '>
            <input type="text" onChange={(e)=>{setcurrenttext(e.target.value)}} placeholder='Chat now' value={currenttext} className='bg-gradient-to-r from-gray-800  to-gray-900 text-white outline-none rounded-lg h-full w-full p-3 ' />
            <button onClick={handleclick} className='bg-[#726fff] rounded-2xl pl-4 pr-4 hover:bg-[#5c5ac2] text-white'>
              
                Send
            </button>
        </div>
        <div className=''>Chat</div>
    </div>
  )
}

export default Chat