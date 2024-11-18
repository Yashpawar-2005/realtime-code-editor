import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';  
import axios from 'axios';
const PreviousRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showRooms, setShowRooms] = useState(false); 
  const [socialHandles] = useState({
    twitter: '@exampleUser',
    linkedin: 'https://linkedin.com/in/exampleUser',
    instagram: '@exampleUserInsta',
  });
  useEffect(() => {
    const fun=async()=>{
        try {
        const data= await axios.get("http://localhost:4000/api/room/getrooms",{
          withCredentials: true, 
        })
        setRooms(data.data.rooms);
        console.log(data.data.rooms)
      } catch (error) {
        console.log(error)
      }
      } 
      fun()
   
  }, []);

  const handleShowRoomsClick = () => {
    setShowRooms(!showRooms); 
  };

  return (
    <div className='w-full h-full p-6 bg-black'>
      <h2 className="text-white text-3xl font-bold mb-4 text-center">Previous Rooms Joined</h2>

      <motion.button
        onClick={handleShowRoomsClick}
        className="w-full py-4 mb-6 bg-dark-purple text-white font-semibold rounded-md transition-all duration-500 hover:bg-purple-800 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
        initial={{ opacity: 1 }}
        animate={{ opacity: showRooms ? 0.7 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {showRooms ? 'Hide Rooms' : 'Show Rooms'}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: showRooms ? 1 : 0,
          height: showRooms ? 'auto' : 0,
        }}
        transition={{
          opacity: { duration: 0.5 },
          height: { duration: 0.5 },
        }}
        className="w-full max-h-[60vh] overflow-y-scroll overflow-x-hidden custom-scrollbar px-4 py-6"
      >
    {rooms.map((obj, index) => (
  <div
    key={index}
    className="w-full bg-dark-purple p-6 mb-6 rounded-xl shadow-xl hover:bg-purple-800 transition-all duration-500 ease-in-out transform hover:scale-105"
  >
    <h3 className="text-white text-lg font-bold mb-4 hover:text-indigo-400 transition-colors duration-300 text-center">
      Roomname: <span className="font-normal">{obj.roomname}</span>
    </h3>

    <div className="flex flex-row justify-between items-start space-x-4">
      <h3 className="text-white text-base font-medium mb-2 hover:text-indigo-400 transition-colors duration-300">
        Created At: <span className="font-normal">{new Date(obj.createdAt).toLocaleString()}</span>
      </h3>

      <h5 className="text-gray-400 text-xs italic">{obj.data}</h5>
    </div>
  </div>
))}


          </motion.div>
      <div className="mt-10 text-white">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex space-x-6 mt-4">
          <a
            href={`https://twitter.com/${socialHandles.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-indigo-500 transition-all duration-300 transform hover:scale-105"
          >
            Twitter: {socialHandles.twitter}
          </a>
          <a
            href={socialHandles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
          <a
            href={`https://instagram.com/${socialHandles.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Instagram: {socialHandles.instagram}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviousRooms;
