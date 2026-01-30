import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAppContext } from "../contexts/AppContext"

export default function Header({name='Sarfraz Pro-Dev'}){
    const {theme, toggleTheme, user} = useAppContext();
    

        


    return (
        <div className="w-screen h-12 py-3 px-6 bg-gray-100 shadow-lg dark:bg-gray-900  flex justify-between fixed top-0 items-center  ">
            <h1 className="dark:text-white text-black">{name}</h1>

            <div className="px-2 text-black flex gap-5">
                <NavLink to='/' className={({isActive}) =>
                isActive? 'text-blue-700 dark:text-blue-400' : ' dark:text-white' }>
                Home
            </NavLink>
                <NavLink to='dashboard' className={({isActive}) =>
                isActive? 'text-blue-700 dark:text-blue-400' : 'dark:text-white' }>
                Dashboard
            </NavLink>
                <NavLink to='contact' className={({isActive}) =>
                isActive? 'text-blue-700 dark:text-blue-400' : 'dark:text-white' }>
                Contact
            </NavLink>
                <NavLink to='login'
                className={({isActive}) =>
                isActive? 'text-blue-700 dark:text-blue-400' : 'dark:text-white' }>
                {user.isLogin? `Login As ${user.name}`:'Login'}
            </NavLink>
            <button
            onClick={toggleTheme} 
            className="cursor-pointer hover:text-xl bg-gray-700/50 px-2 py-1 rounded-xl">
                {theme==='light'? '🌙':'☀'}
            </button>
            </div>

        </div>
    )
}