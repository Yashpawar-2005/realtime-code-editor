import React from 'react'
import Three from './Three.jsx'

import Sign from './Sign';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
const Signup = () => {
   
  return (
    <div className='min-h-screen w-screen flex flex-col-reverse xl:flex-row bg-gradient-to-r from-purple-800 via-purple-900 to-black item-center justify-between'>
        <div className='xl:w-[60vw] w-screen'>
        <Canvas className='w-full h-full'>
    <Three/>
        </Canvas>
        </div>
        <div className='w-full h-full'>

    <Sign/>    
        </div>
    </div>
  )
}

export default Signup