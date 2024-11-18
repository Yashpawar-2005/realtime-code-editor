import React,{useEffect} from 'react'
import { alllang } from "./constants.js";
    import { useRecoilState, useRecoilValue,useSetRecoilState } from 'recoil';
import { toggl,editortheme,languagee } from './atoms.js';

import axios from 'axios';
import { userdata } from './atoms.js';

const Topbar = () => {
    const toggle=useRecoilValue(toggl)
    const settoggle=useSetRecoilState(toggl)
    const editorTheme=useRecoilValue(editortheme)
    const setEditorTheme=useSetRecoilState(editortheme)
    const language=useRecoilValue(languagee)
    const setlanguage=useSetRecoilState(languagee)
const {setUser}=userdata()



        
const handlelogout=async()=>{
  try {
    const res= await axios.post("http://localhost:4000/api/auth/logout",{ withCredentials: true,  })
    console.log(res)
    setUser(null)
    console.log(res)
  } catch (error) {
    console.log("error in loggin out  "+error)
  }
}



    const settheme = (e) => {
        const th = e.target.value;
        setEditorTheme(th);
        settoggle((prev)=>{return !prev})
      };
    
      const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setlanguage(() => {
          return selectedLanguage;
        });
        settoggle((prev)=>{return !prev})
       
      };
  return (
  <>
    <div className="block md:hidden ">
{toggle?
<div className="bg-gradient-to-r from-slate-900 to-slate-950 justify-between pl-6 pr-6 items-center  transition-all duration-100 ease-in-out p-4">
  <button className="text-white" onClick={()=>(settoggle((prev)=>{return !prev}))}
    >
toggle switch
</button>
</div>:  

<div className="flex flex-col bg-slate-900 top-0 left-0  ">
<button className="text-white" onClick={()=>(settoggle((prev)=>{return !prev}))}
    >
toggle switch
</button>
        <div className="flex flex-col gap-4">
          <div className="relative inline-block">
            <select
              value={editorTheme}
              onChange={settheme}
              className="p-3 bg-slate-900 text-white rounded-md shadow-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-slate-800 transition-colors"
              >
              <option value="vs-dark" className="rounded-md">
                Dark
              </option>
              <option value="vs" className="rounded-md">
                Light
              </option>
              <option value="hc-black" className="rounded-md">
                High Contrast
              </option>
              <option value="vs-dark" className="rounded-lg">
                Custom
              </option>
            </select>
          </div>
          <div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-3 bg-slate-900 text-white rounded-md shadow-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-slate-800 transition-colors"
              >
                {alllang.map((element)=>{
                  return (
                  <option 
                   key={element.language}
                    value={element.language}>{element.title}
                  
                  </option>
               

)
})}
            </select>
          </div>
        </div>

        <div className=" text-white items-center flex flex-col gap-4">
          <button >leave room</button>
          <button>logout</button>
        </div>
      </div>
}
</div>

<div className="hidden md:block">
      <div className="flex flex-row gap-4 bg-black justify-between pl-6 pr-6  pt-1 pb-1 items-center">
        <div className="flex flex-row gap-4">
          <div className="relative inline-block">
            <select
              value={editorTheme}
              onChange={settheme}
              className="p-3 bg-slate-900 text-white rounded-md shadow-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-slate-800 transition-colors"
              >
              <option value="vs-dark" className="rounded-md">
                Dark
              </option>
              <option value="vs" className="rounded-md">
                Light
              </option>
              <option value="hc-black" className="rounded-md">
                High Contrast
              </option>
              <option value='kimbie-dark' className="rounded-lg">
                New
              </option>
            </select>
          </div>
          <div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-3 bg-slate-900 text-white rounded-md shadow-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-slate-800 transition-colors"
              >
            {alllang.map((element)=>{
                  return (
                  <option 
                   key={element.language}
                    value={element.language}>{element.title}
                  
                  </option>
               

)
})}
            </select>
          </div>
        </div>

        <div className=" text-white items-center flex flex-row gap-3">
          <button className='bg-[#6261cc] rounded-xl pl-4 pt-2 pb-2 pr-4 hover:bg-[#5352ad]'>leave room</button>
          <button className='bg-[#6261cc] rounded-xl pl-4 pt-2 pb-2 pr-4 hover:bg-[#5352ad]' onClick={handlelogout}>logout</button>
        </div>
      </div>


    </div>

</>
  )
}

export default Topbar