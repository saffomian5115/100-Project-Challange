import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext"
import api from "../api";
import { Mail, LockKeyhole, DivideCircle } from "lucide-react";
import toast, {Toaster} from 'react-hot-toast'

export default function Login(){
    const navigate = useNavigate();
    const {user, login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e){
        e.preventDefault();
        api.post('/auth/login', {email, password})
            .then((res)=> {
                toast.success(res.message)
                login(res.data)
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                    })
            .catch((err)=> {
                const msg = err.response?.data?.message || 'something went wrong';
                toast.error(msg)
            })
    }

    if(user.token) {
        return (
        <div className="w-screen h-[80vh]  flex  justify-center items-center">
            <div className="flex flex-col gap-6  p-8 border-2 rounded-xl shadow-lg shadow-gray-100/20">
                <button onClick={logout} className="w-sm py-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-700">Log Out</button>
            {user.role === 'admin'? <Link to='/auth/signup' className="w-sm py-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-700">ADD User</Link>:''}
            </div>
        </div>
        )
    }


    return(

        <div className="flex justify-center items-center w-screen h-[80vh]">
            <Toaster></Toaster>
            <form onSubmit={handleLogin} className="w-96 font-medium backdrop-blur-xl bg-gray-900/50 border-2 shadow-lg shadow-white/10 flex flex-col items-center gap-6 p-4 border-gray-500 rounded-xl">
                <h1 className="text-2xl font-bold mb-2">Login</h1>
                <div className="relative w-full h-14 border-b-2">
                    <Mail className="absolute right-1 bottom-2"/>
                    <input type='email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className="h-full bottom-2 w-[85%] bg-transparent outline-none peer"    
                    />
                    <label className="absolute left-1 bottom-2 pointer-events-none transition-all duration-500 ease-in-out peer-focus:bottom-10 peer-valid:bottom-10">Email</label>
                </div>
                <div className="relative w-full h-14 border-b-2">
                    <LockKeyhole className="absolute right-1 bottom-2"/>
                    <input type='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        className="h-full bottom-2 w-[85%] bg-transparent outline-none peer"    
                    />
                    <label className="absolute left-1 bottom-2 pointer-events-none transition-all duration-500 ease-in-out peer-focus:bottom-10 peer-valid:bottom-10">Password</label>
                </div>
                <div className="flex justify-between w-full">
                    <label className="text-sm" ><input type="checkbox" /> Remeber Me!</label>
                    <Link className="text-blue-500 underline text-sm">Forget Password</Link>
                </div>
                <button type="submit" className="w-full p-2 rounded-xl shadow-lg shadow-blue-700/20 bg-blue-700 hover:bg-blue-600 active:bg-blue-500">Login</button>
                <div className="w-full text-left ">
                    <label className="text-sm">Don't have Account?  </label>
                    <Link to='/auth/signup' className="text-blue-400 underline">Sign up</Link>
                </div>

            </form>
        </div>
    )
}