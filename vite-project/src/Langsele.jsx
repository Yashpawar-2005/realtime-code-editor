import React, { useState } from 'react';
import { cppimage, pythonimage, jsimage, tsimage } from './constants.js'; // Adjust import path

const LanguageSelector = ({ language, setlanguage }) => {
 
  const [isOpen, setIsOpen] = useState(false);

 
  const toggleDropdown = () => setIsOpen(!isOpen);


  const handleLanguageChange = (selectedLanguage) => {
    setlanguage(selectedLanguage);  
    setIsOpen(false); 
  };

  return (
    <div className="relative inline-block w-48">
     
      <button
        onClick={toggleDropdown}
        className="p-2 bg-gray-800 text-white rounded-md w-full text-left"
      >
        {language || "Select Language"}
      </button>

      {isOpen && (
        <div className="absolute w-full bg-gray-800 mt-1 rounded-md shadow-lg">
          <div
            className="flex items-center p-2 text-white cursor-pointer hover:bg-gray-700"
            onClick={() => handleLanguageChange('javascript')}
          >
            <img src={jsimage} alt="JavaScript" width={20} height={20} className="mr-2" />
            JavaScript
          </div>
          <div
            className="flex items-center p-2 text-white cursor-pointer hover:bg-gray-700"
            onClick={() => handleLanguageChange('python')}
          >
            <img src={pythonimage} alt="Python" width={20} height={20} className="mr-2" />
            Python
          </div>
          <div
            className="flex items-center p-2 text-white cursor-pointer hover:bg-gray-700"
            onClick={() => handleLanguageChange('C++')}
          >
            <img src={cppimage} alt="C++" width={20} height={20} className="mr-2" />
            C++
          </div>
          <div
            className="flex items-center p-2 text-white cursor-pointer hover:bg-gray-700"
            onClick={() => handleLanguageChange('typescript')}
          >
            <img src={tsimage} alt="TypeScript" width={20} height={20} className="mr-2" />
            TypeScript
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
