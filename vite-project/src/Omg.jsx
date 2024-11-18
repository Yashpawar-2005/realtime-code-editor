import React from 'react'
import Left from './Left'
import RightSide from "./RightSide.jsx";
import './App.css'

const Omg = () => {
  return (
    <div className="flex flex-col xl:flex-row">
       <Left/>
        <div className="bg-slate-700 h-screen xl:flex-1">
          <RightSide />
        </div>
      </div>
  )
}

export default Omg