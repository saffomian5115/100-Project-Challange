import { NavLink } from 'react-router-dom';
import {Sprout} from 'lucide-react'

function CustomLink({children, to}){
   return (
   <NavLink to={to} className={({isActive})=> `relative transition-colors duration-300 after:absolute after:content-[''] after:w-0 after:h-0.5 after:bg-white after:rounded-xl after:left-1/2 after:-translate-x-1/2 after:-bottom-1 hover:after:w-full after:transition-all after:duration-500 ${isActive? 'text-blue-600':''}`}>
        {children}
    </NavLink>
   )
}
export default function Navbar(){


    return (
        <div className='sticky top-0 z-50 px-6 bg-transparent backdrop-blur-xl h-14 shadow-md shadow-white/10 flex justify-between items-center'>
            <h1 className='font-bold text-xl'>
                <Sprout className='inline mr-3 '/>
                Sarfraz Pro-Dev
            </h1>
            <div className='flex gap-6'>
                <CustomLink to='/'>Dashboard</CustomLink>
                <CustomLink to='/students'>Student</CustomLink>
                <CustomLink to='/announcements'>Announcements</CustomLink>
                <CustomLink to='/auth/Login'>Login</CustomLink>

            </div>

        </div>
    )
}
