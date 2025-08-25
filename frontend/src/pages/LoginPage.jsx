import React from 'react'
import watermark from '../assets/watermark.png';
import menu3 from '../assets/menu3.png';
import W_back from '../assets/W_back.png';
import submit from '../assets/submit.png';
import div from '../assets/div.png';

const LoginPage = () => {
  return (
    <div className="relative flex flex-col h-screen w-screen justify-center items-center bg-blood overflow-hidden">
          
          <img 
            src={menu3} 
            alt="Formulaire" 
            className="absolute inset-0 w-full h-full p-5 object-contain z-0" 
          />
          
          <form className="relative z-10 content-between">
            
            <img 
                src={W_back}
                alt="Welcome back !"
                className="w-50 items-center mb-10 mx-auto"
            />
    
            <div className="flex flex-col w-60 gap-6">
    
              <label className="text-blood font-gara text-md flex flex-col gap-2">
                Email
                <input type="email" className="bg-none outline-none border-none font-gara italic text-ciel autofill:font-gara autofill:italic autofill:text-ciel autofill:bg-nape" />
    
                <img 
                  src={div} 
                  alt="divider" 
                  className=""
                />
              </label>
    
              <label className="text-blood font-gara text-md flex flex-col gap-2">
                Password
                <input type="password" className="bg-none outline-none border-none font-gara italic text-ciel" />
    
                <img 
                  src={div} 
                  alt="divider" 
                  className=""
                />
              </label>
    
              <button type="submit" className="self-end">
                <img src={submit} alt="Submit" className="inline-block w-10 cursor-pointer"/>
    
              </button>
            </div>
          </form>
    
          <text className="mt-5 text-ciel font-gara italic text-sm z-10 hover:underline cursor-pointer">
            New ? Sign up here.
          </text>
    
          <div className="fixed bottom-0 left-0 size-30 m-10 z-50"> 
            <img src={watermark} alt="watermark" className=""/>
          </div>
    
    
          
        </div>
  )
}

export default LoginPage