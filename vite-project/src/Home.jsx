import React, { useEffect, useState } from 'react'
import JoinRoom from './JoinRoom'
import PreviousRooms from './PreviousRooms'
import Navbar from './Navbar'
const Home = () => {
   
  return (
    <>
    <div className='h-screen w-screen'>

    <Navbar/>
    <div className='h-full w-full flex justify-center items-center pt-14 '>
    <div className=' h-full w-[80vw] flex flex-col xl:flex-row'>
    <JoinRoom/>
    <PreviousRooms/>
    </div>
    </div>
    </div>
    </>
    
  )
}

export default Home