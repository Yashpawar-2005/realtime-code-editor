import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useRecoilState } from 'recoil';
import { createroomrole, joinroomrole } from './atoms';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';

const JoinOrCreateRoom = () => {
  const [joinRoomName, setJoinRoomName] = useState('');
  const [joinRole, setJoinRole] = useRecoilState(joinroomrole);
  const [createRoomName, setCreateRoomName] = useState('');
  const [createRole, setCreateRole] = useRecoilState(createroomrole);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(true);
  const navigate = useNavigate();


  const toastOptions = {
    position: "top-right", 
    autoClose: 3000, 
    
    
    className: 'toast-purple', 
    style: {
      backgroundColor: '#8406d0', 
      color: 'white', 
      fontWeight: 'bold',
      borderRadius: '8px', 
    },
  };

  // Handlers for updating state
  const handleJoinRoomNameChange = (e) => {
    setJoinRoomName(e.target.value);
  };

  const handleJoinRoleChange = (e) => {
    setJoinRole(e.target.value);
  };

  const handleCreateRoomNameChange = (e) => {
    setCreateRoomName(e.target.value);
  };

  const handleCreateRoleChange = (e) => {
    setCreateRole(e.target.value);
  };

  const handleJoinRoom = () => {
    if (!joinRoomName) {
      toast.error("Room name cannot be empty!", toastOptions);
      return;  
    }
    try {
      const res=axios.post("http://localhost:4000/api/room/createroom",{joinRoomName,joinRole},{ withCredentials: true, })
      toast.success(`Joining room ${joinRoomName} as ${joinRole}`, toastOptions);
    setTimeout(() => {
      navigate(`/${joinRoomName}`);
    }, 3000);
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleCreateRoom = () => {
    if (!createRoomName) {
      toast.error("Room name cannot be empty!", toastOptions);
      return; 
    }

    toast.success(`Creating room ${createRoomName} as ${createRole}`, toastOptions);
    setTimeout(() => {
      navigate(`/${createRoomName}`);
    }, 3000);
  };

  const handleToggleJoinRoom = () => {
    setIsJoinRoomOpen(true);
  };

  const handleToggleCreateRoom = () => {
    setIsJoinRoomOpen(false);
  };

  return (
    <div className="w-full h-full p-3 bg-black flex">
      <div className="w-full max-w-4xl pl-8 pr-10 bg-black/90 rounded-lg shadow-2xl">
        <h2 className="text-white text-4xl font-extrabold text-center mb-8 leading-tight tracking-wide uppercase">
          Join or Create a Room
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className="px-8 py-4 text-white font-semibold rounded-full bg-blue-800 hover:bg-blue-950 focus:outline-none transition-all duration-300"
            onClick={handleToggleJoinRoom}
          >
            Join Room
          </button>
          <button
            className="px-8 py-4 text-white font-semibold rounded-full bg-green-700 hover:bg-green-800 focus:outline-none transition-all duration-300"
            onClick={handleToggleCreateRoom}
          >
            Create Room
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isJoinRoomOpen && (
            <motion.div
              className="p-6 rounded-lg shadow-lg bg-[#1b071bbb]"
              key="joinRoom"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white text-2xl font-semibold mb-4 text-center">Join Room</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg text-white mb-2 font-medium tracking-tight" htmlFor="joinRoomName">
                    Room Name
                  </label>
                  <input
                    id="joinRoomName"
                    type="text"
                    className="w-full p-4 rounded-2xl bg-slate-950 text-white border border-gray-700 focus:ring-2 focus:ring-purple-900 focus:outline-none transition duration-200"
                    placeholder="Enter Room Name"
                    value={joinRoomName}
                    onChange={handleJoinRoomNameChange}
                  />
                </div>

                <div>
                  <label className="block text-lg text-white mb-2 font-medium tracking-tight" htmlFor="joinRole">
                    Select Role
                  </label>
                  <select
                    id="joinRole"
                    className="w-full p-4 rounded-2xl bg-slate-950 text-white border border-gray-700 focus:ring-2 focus:ring-purple-900 focus:outline-none transition duration-200"
                    value={joinRole}
                    onChange={handleJoinRoleChange}
                  >
                    <option value="visitor">Visitor</option>
                    <option value="collaborator">Collaborator</option>
                  </select>
                </div>

                <button
                  className="w-full py-4 text-white font-semibold rounded-3xl transition-all duration-300 button-colors focus:outline-none tracking-wide"
                  onClick={handleJoinRoom}
                >
                  Join Room Now
                </button>
              </div>
            </motion.div>
          )}

          {!isJoinRoomOpen && (
            <motion.div
              className="p-6 rounded-lg shadow-lg bg-[#1b071bbb]"
              key="createRoom"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white text-2xl font-semibold mb-4 text-center">Create Room</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg text-white mb-2 font-medium tracking-tight" htmlFor="createRoomName">
                    Room Name
                  </label>
                  <input
                    id="createRoomName"
                    type="text"
                    className="w-full p-4 rounded-2xl bg-slate-950 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                    placeholder="Enter Room Name"
                    value={createRoomName}
                    onChange={handleCreateRoomNameChange}
                  />
                </div>

                <div>
                  <label className="block text-lg text-white mb-2 font-medium tracking-tight" htmlFor="createRole">
                    Select Role
                  </label>
                  <select
                    id="createRole"
                    className="w-full p-4 rounded-2xl bg-slate-950 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                    value={createRole}
                    onChange={handleCreateRoleChange}
                  >
                    <option value="visitor">Visitor</option>
                    <option value="collaborator">Collaborator</option>
                  </select>
                </div>

                <button
                  className="w-full py-4 text-white font-semibold rounded-md transition-all duration-300 button-colors tracking-wide"
                  onClick={handleCreateRoom}
                >
                  Create Room Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ToastContainer /> 
      </div>
    </div>
  );
};

export default JoinOrCreateRoom;
