import { useState } from 'react'
import watermark from '../assets/watermark.png';
import menu3 from '../assets/menu3.png';
import W_back from '../assets/W_back.png';
import paper_submit from '../assets/paper_submit.svg';
import div from '../assets/div.png';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { login, isLoading, error }= useAuthStore();
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  await login(email, password);
  navigate("/");
}

  return (
    <div className="relative flex flex-col h-screen w-screen justify-center items-center bg-blood overflow-hidden">
          
          <img 
            src={menu3} 
            alt="Formulaire" 
            className="absolute inset-0 w-full h-full p-5 object-contain z-0" 
          />
          
          <form 
            onSubmit={handleSubmit}
            className="relative z-10"
          >
            
            <img 
                src={W_back}
                alt="Welcome back !"
                className="w-55 items-center mb-15 mx-auto"
            />
    
            <div className="flex flex-col w-60 gap-6">
    
              <label 
                htmlFor='email'
                className="text-blood font-gara text-md flex flex-col gap-2">
                Email
                <input 
                  id='email'
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-none outline-none border-none font-gara italic text-ciel" 
                  required
                />
                  
                <img 
                  src={div} 
                  alt="divider" 
                  className=""
                />
              </label>
    
              <label 
                htmlFor='password'
                className="text-blood font-gara text-md flex flex-col gap-2">
                Password
                <input 
                  id='password'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-nape outline-none border-none font-gara italic text-ciel" 
                  required
                />
    
                <img 
                  src={div} 
                  alt="divider" 
                  className=""
                />
              </label>
              {error && <p className="font-gara italic text-red-500 text-sm">{error}</p>}
              <button type="submit" className="self-end" disabled={isLoading}>
                {isLoading ?  
                <img src={paper_submited} alt="Submited" className="inline-block w-10"/>
                  : 
                <img src={paper_submit} alt="Submit" className="inline-block w-10 cursor-pointer"/>
                }
              </button>
            </div>
          </form>
    
          <button onClick={() => navigate('/signup')} className="mt-5 text-ciel font-gara italic text-sm z-10 hover:underline cursor-pointer">
            New ? Sign up here.
          </button>
    
          <div className="fixed bottom-0 left-0 size-30 m-10 z-50"> 
            <img src={watermark} alt="watermark" className=""/>
          </div>
    
    
          
        </div>
  )
}