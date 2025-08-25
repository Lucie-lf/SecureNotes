import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';


export default function SignUpPage() {

    const [value, setValue] = useState("");
    const { verifyEmail, isLoading, error } = useAuthStore();

    const navigate = useNavigate();

    return(
        <div>
        
        </div>
    )
}