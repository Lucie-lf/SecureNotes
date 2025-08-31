import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import lettre from '../assets/lettre.png';

export default function VerificationEmailPage() {
    const [inputCode, setInputCode] = useState("");
    const { verifyEmail, isLoading, error, user } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const success = await verifyEmail(inputCode);
        if(success) {
            navigate("/dashboard");
        }
    };

    return(
        <div className="relative flex flex-col h-screen w-screen justify-center items-center bg-blood overflow-hidden"> 
            
            <img 
                src={lettre} 
                alt="Formulaire" 
                className="absolute inset-0 w-full h-full p-5 object-contain z-0" 
            />
            
            <div className="flex flex-col justify-center items-center pb-50">
                <div className="absolute flex flex-col h-30 w-80 z-10 gap-5">
                    <div className="text-blood font-gara text-xl flex flex-col gap-2 mt-4 text-center italic items-center justify-center">
                        <input 
                            type="text" 
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            className="font-gara text-blood w-[70%] outline-0 not-italic text-center border-ciel rounded-sm border-1 p-3" 
                            required
                            placeholder="Enter your code"
                            maxLength={6}
                        />
                    </div>
                    
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    
                    <button 
                        className="border-1 px-2 w-fit place-self-center rounded-full font-gara border-ciel text-ciel hover:bg-ciel hover:text-blood cursor-pointer"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}>
                        {isLoading ? "VERIFYING..." : "SUBMIT"}
                    </button>
                </div>
            </div>
        </div>
    )
}