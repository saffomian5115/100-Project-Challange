import { NavLink, Outlet, useLocation} from 'react-router-dom'
import { projects } from '../assets/Data/MiniProjects'

export default function Dashboard(){
    
    const location = useLocation();
    const isNested = location.pathname !== '/dashboard';
    
    return (
        
        <div className='grid grid-cols-3 gap-3 p-3'>
                 {!isNested && projects.map((p, i) => (
                    <NavLink key={i} to={`/dashboard/${p.element}`} className="p-4 rounded-xl  bg-blue-400 hover:bg-blue-600 flex gap-3  items-center">
                        <img className="w-16 h-16 rounded-full shadow-lg ring-1 ring-gray-900 shadow-black" src={p.src} alt="image" />
                        <h1 className="font-bold text-xl">{p.name}</h1>
                    </NavLink>
                 ))}
                    <Outlet/>
                </div>
       
    )
}