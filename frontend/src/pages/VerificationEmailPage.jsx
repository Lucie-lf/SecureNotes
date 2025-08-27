import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import lettre from '../assets/lettre.png';
//import toast, { Toaster } from 'react-hot-toast';

export default function VerificationEMailPage() {

    const [inputCode, setInputCode] = useState();
    const { verifyEmail, isLoading, error } = useAuthStore();
    //const { toast } = Toaster(); 
    const handleSubmit = async () => {
        await verifyEmail(inputCode);
        if(!error && !isLoading) {
            toast({
                title: "Email verified",
                description: "Your email has been verified successfully !",
                status: "success",
                duration: 5000,
                isClosable: true,
            })

        };
    };

    return(
        <div className="relative flex flex-col h-screen w-screen justify-center items-center bg-blood overflow-hidden"> 
            
            <img 
            src={lettre} 
            alt="Formulaire" 
            className="absolute inset-0 w-full h-full p-5 object-contain z-0" 
            />
            
            <div className="flex flex-col justify-center items-center pb-50">
            <form 
            onSubmit={""}
            className="absolute bg-ciel/50 flex flex-col h-30 w-80 z-10"
            >
                  
                  <label 
                    htmlFor='inputCode'
                    className="text-blood font-gara text-xl flex flex-col gap-2 text-center italic items-center justify-center">
                    Verification code :
                    <input 
                      type="text" 
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="font-gara text-blood w-[70%] not-italic text-center border-blood border-1 p-3" 
                      required
                    />
                  </label>
                  
                  <button type="submit" onClick={handleSubmit}>
                    ok
                  </button>
        
              </form>
              </div>
              <div className="absolute inset-0 w-full h-full">

              </div>
            </div>
    )
}