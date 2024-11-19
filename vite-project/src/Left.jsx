import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { languagee, editorValu, editortheme,  userdata, role, livetoggle } from "./atoms.js";
import { motion } from 'framer-motion';  
import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useRef } from 'react';
const Left = () => {
  const language = useRecoilValue(languagee);
  const rolee=useRecoilValue(role)
  const typee=rolee
  const {user}=userdata()
  const userr=user.username;
  const[togglestate,settogglestate]=useRecoilState(livetoggle)
  const editorTheme = useRecoilValue(editortheme);
  const setEditorValue = useSetRecoilState(editorValu);
  const editorValue = useRecoilValue(editorValu);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [ansReceived, setAnsReceived] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [showPreview, setShowPreview] = useState(false); 
  const [showEmbedOption, setShowEmbedOption] = useState(false); 
  const socket = useRef(null);
  
  const toastOptions = {
    position: "top-right", 
    autoClose: 3000, 
    className: 'toast-purple', 
    style: {
      backgroundColor: '#6700a6', 
      color: 'white', 
      fontWeight: 'bold',
      borderRadius: '8px', 
    },
  };


  
  useEffect(() => {
    socket.current = io('http://localhost:4000', {
      withCredentials: true,  
    });
socket.current.emit('comm', {usernamee:userr, typee });
socket.current.on('comm',({usernamee,typee})=>{
  toast.success(`${usernamee} joined as ${typee}`,toastOptions)
})
    

    socket.current.on('message', (data) => {
      setMessage(data);
    });
    

    return () => {
        socket.current.on('user disconnected',({username,type})=>{
                console.log("disconnecte")
                console.log(username,type)
        })
      socket.current.disconnect();

    };
  }, []);
  useEffect(() => {
    console.log(togglestate)
    if (togglestate) {
      socket.current.emit("broadcast", editorValue);
 
      socket.current.on("getvalue", (updatedEditor) => {
        setEditorValue(updatedEditor); 
      });
    }

    return () => {
      socket.current.off("getvalue");
    };
  }, [togglestate]); 


  
  useEffect(() => {
    console.log("Selected language:", language);
    setEditorValue(`// Write your ${language} code here`);
  }, [language]);

  const handleEditorChange = (newValue) => {
    setEditorValue(newValue);
  };

  const togglePromptVisibility = () => {
    setIsPromptVisible(!isPromptVisible);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmitPrompt = async () => {
    try {
      toast("Fetching data...", toastOptions);

      const res = await axios.post("http://localhost:4000/api/room/aihelp", { editorValue, prompt }, { withCredentials: true });
      setResponseText(res.data.text);
      setAnsReceived(true); 
      setShowPreview(true); 
      console.log(res.data.text);
      toast.success("Fetched data successfully", toastOptions);
    } catch (error) {
      toast.error("Error while fetching data!", toastOptions);
    }
    setIsPromptVisible(false);
  };

  
  const handleEmbedResponse = () => {
    setEditorValue(editorValue + "\n\n" + responseText); 
    setShowEmbedOption(false); 
    setShowPreview(false)
    toast.success("Response inserted into editor", toastOptions);
  };

  const handleCancelEmbed = () => {
    setShowEmbedOption(false); 
    setShowPreview(false); 
  };

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      <button
        className="absolute bottom-[80px] z-30 p-4 left-[20px] bg-purple-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-purple-900 transition-colors"
        onClick={togglePromptVisibility}
      >
        AI Help?
      </button>

      <Editor
        className="h-full w-full"
        theme={editorTheme}
        value={editorValue}
        onChange={handleEditorChange}
        language={language}
        minimap={{
          enabled: true,
          showSlider: 'mouseover',
          scale: 2,
          side: 'right',
          size: 'proportional',
        }}
      />

      {isPromptVisible && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center p-4 z-40 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="w-full sm:w-96 md:w-96 lg:w-96 p-6 bg-black/10 rounded-lg shadow-2xl">
            <h3 className="text-lg sm:text-xl text-white mb-4">Enter your prompt:</h3>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              className="w-full h-32 p-3 bg-gray-700 text-white border border-purple-600 rounded-md mb-4 focus:ring-2 focus:ring-purple-400"
              placeholder="Ask me anything for the given code..."
            />
            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              <button
                onClick={handleSubmitPrompt}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none w-full sm:w-auto"
              >
                Submit
              </button>
              <button
                onClick={togglePromptVisibility}
                className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 focus:outline-none w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showPreview && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 p-6 bg-black/50 text-white rounded-lg shadow-2xl max-h-[30vh] overflow-scroll custom-scrollbar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h4 className="text-lg font-semibold">AI Response Preview:</h4>
          <pre className="whitespace-pre-wrap bg-gray-800 p-4 rounded-lg mt-2">{responseText}</pre>
          
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleEmbedResponse}
              className="button-color text-white px-4 py-2 rounded-md hover:bg-green-500 focus:outline-none"
            >
              Embed into editor
            </button>
            <button
              onClick={handleCancelEmbed}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Left;
