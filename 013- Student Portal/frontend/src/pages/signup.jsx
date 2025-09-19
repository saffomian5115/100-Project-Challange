import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";
import { User, Mail, LockKeyhole, UserStar } from "lucide-react";

export default function Signup(){

    const {user, login} = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState('student');

    function handleSignup(e){
        e.preventDefault();
        api.post('/auth/signup', {name, email, password, role})
        .then((res)=>{
            toast.success(res.message);
            api.post('/auth/login', {email, password})
            .then((res)=> {
                login(res.data)
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                    })
            .catch((err)=> {
                const msg = err.response?.data?.message || 'something went wrong during login';
                toast.error(msg)
            })
        })
        .catch((err)=>{
            const msg = err.response?.data?.message || 'something went wrong during signup'
            toast.error(msg)
        })
    }

    return(
        <div className="w-screen pt-6 flex justify-center items-center">
            <form onSubmit={handleSignup} className="w-96 bg-gray-900/50 backdrop-blur-sm p-4 border-2 rounded-xl flex flex-col gap-6 items-center">
                <h1 className="mb-2 text-2xl font-bold">Sign Up</h1>
                <div className="w-full h-10 border-b-2 relative">
                    <User className="absolute right-1 bottom-2" />
                    <input type="text" 
                        placeholder=" "
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                        className="w-[90%] h-full bg-transparent outline-none peer"    
                    />
                    <label className="absolute left-1 bottom-2 pointer-events-none transition-all duration-500 ease-out peer-focus:bottom-8 peer-focus:text-sm peer-valid:bottom-8">Name</label>
                </div>
                <div className="w-full h-10 border-b-2 relative">
                    <Mail className="absolute right-1 bottom-2" />
                    <input type="email" 
                        placeholder=""
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className="w-[90%] h-full bg-transparent outline-none peer"    
                    />
                    <label className="absolute left-1 bottom-2 pointer-events-none transition-all duration-500 ease-out peer-focus:bottom-8 peer-valid:bottom-8">Email</label>
                </div>
                <div className="w-full h-10 border-b-2 relative">
                    <LockKeyhole className="absolute right-1 bottom-2" />
                    <input type="password" 
                        placeholder=""
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        className="w-[90%] h-full bg-transparent outline-none peer"    
                    />
                    <label className="absolute left-1 bottom-2 pointer-events-none transition-all duration-500 ease-out peer-focus:bottom-8 peer-valid:bottom-8">Password</label>
                </div>
               {user.role ==='admin'?  <div className="w-full h-10 border-b-2 relative">
                    <UserStar className="absolute right-1 bottom-2" />
                    <select value={role}
                        onChange={(e)=> setRole(e.target.value)}
                        className="bg-transparent outline-none">
                        <option value="student" className="text-black">Student</option>
                        <option value="admin" className=" text-black">Admin</option>
                    </select>
                </div>:''}
                <button type="submit" className="w-full mx-4 p-2 bg-blue-800 hover:bg-blue-700 active:bg-blue-600  rounded-xl font-bold">Sign Up</button>
                <div className="w-full text-left">
                    <label className="text-sm">I have Account! </label>
                    <Link to='/auth/login' className='text-blue-400 underline'>Login</Link>
                </div>
            </form>
        </div>
    )
}