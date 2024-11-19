import React, { useEffect, useState } from "react";

import Topbar from "./Topbar.jsx";
import Omg from "./Omg.jsx";
import SocketIOComponent from "./Control.jsx";

const MonacoEditorComponent = () => {
 

  

  return (
    <div
      className="h-screen w-full
      overflow-x-hidden"
    >
      <Topbar/>
      <Omg />
      
    </div>
  );
};

export default MonacoEditorComponent;
