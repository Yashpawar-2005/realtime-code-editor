import React, { useState, useEffect } from 'react';
import { userdata } from './atoms';
import axios from 'axios';
const Navbar = () => {
  const [noroom, setnoroom] = useState(0);
  const { user } = userdata();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout =async () => {
    try {
      const res= await axios.post("http://localhost:4000/api/auth/logout",{ withCredentials: true,  })
      console.log(res)
      setUser(null)
      console.log(res)
    } catch (error) {
      console.log("error in loggin out  "+error)
    }
   
  };

  useEffect(() => {
    setnoroom(200);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-purple-950 p-3 shadow-md text-2xl">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
        
        <div className="flex items-center space-x-2">
          <img
            src="../public/images/js.png"
            alt="Company Logo"
            className="h-6 w-6 object-cover"
          />
          <span className="text-white text-3xl font-semibold cursor-pointer">Yash</span>
        </div>

        {noroom > 0 && (
          <div className="text-white text-lg font-medium hidden md:block">
            <span>No of rooms joined: </span>
            <span className="font-semibold">{noroom}</span>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={user.profileImg || '../public/images/ts.png'}
                alt="Profile"
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-white text-sm font-medium">{user.name}</span>
            </div>
          )}

          <button
            onClick={logout}
            className="text-white text-sm font-medium px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-white text-2xl font-semibold cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ overflow: 'hidden' }}
      >
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-4 flex flex-col items-center space-y-4">
          {user && (
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={user.profileImg || '../public/images/ts.png'}
                alt="Profile"
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-white text-sm font-medium">{user.name}</span>
            </div>
          )}
          <button
            onClick={logout}
            className="text-white text-sm font-medium px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
