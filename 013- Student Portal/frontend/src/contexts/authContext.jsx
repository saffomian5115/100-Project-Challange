import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user, setUser] = useState({});

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        if(token && role ) setUser({token, role})
    },[])

    function login(data){
        const token = data.token;
        const role = data.role;
        if(token && role ) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser({token, role})
            
        }
    }

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser({})
    }

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);