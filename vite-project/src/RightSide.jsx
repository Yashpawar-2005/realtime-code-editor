import React from 'react'
import Video from './components/Vid/Video'
import Chat from './components/Chat/Chat'
const RightSide = () => {
  return (
    <div
    className='w-[30vw] flex flex-col space-between h-full'>
        <div className='w-full h-full'>
            <Video/>
        </div>
        <div className='w-full h-full'>
            <Chat/>
        </div>
    </div>
  )
}

export default RightSide