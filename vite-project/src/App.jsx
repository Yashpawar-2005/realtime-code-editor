import { useState } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import './App.css';
import MonacoEditorComponent from './Editor.jsx';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from './Login.jsx';
import Home from './Home.jsx';
import Fourpage from './Fourpage.jsx';
import Signup from './Signup.jsx';
import { userdata } from './atoms.js';
import { AnimatePresence, motion } from 'framer-motion';
import Code from './Code.jsx';

function App() {
  const { user, setUser } = userdata();
  const location = useLocation();

  return (
    
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/signup"
            element={!user ? <Animation><Signup /></Animation> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Animation><Login /></Animation> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <Animation><Home /></Animation> : <Navigate to="/signup" />}
          />
          <Route
            path="/:roomname"
            element={user ? <Animation><Code /></Animation> : <Navigate to="/signup" />}
          />
          <Route path="*" element={<Fourpage />} />
        </Routes>
      </AnimatePresence>
  
  );
}

const Animation = ({ children }) => {
  return (
    <motion.div
    initial={{ opacity: 0, x: -100 }}  // Start from the left with 0 opacity
    animate={{ opacity: 1, x: 0 }}     // Move to original position and fade in
    exit={{ opacity: 0, x: 50 }}      // Slide out to the right and fade out
    transition={{
      duration: 0.6,
      ease: 'easeInOut',  // Smoother easing on both ends
    }}
  >
    {children}
  </motion.div>
  
  
  );
};

export default App;
