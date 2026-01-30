import { useContext, useState, createContext, useEffect } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const storedTheme = localStorage.getItem('theme');
    const [user, setUser ] = useState({name:'Sarfraz', isLogin:true})
    const [theme, setTheme] = useState(storedTheme)

    useEffect( () => {
       localStorage.setItem('theme', theme)       
       if(theme === 'light') {
           document.documentElement.classList.remove('dark')
    }
    else if(theme === 'dark') {
        document.documentElement.classList.add('dark')
        }
        },[theme]);
        
    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user))
    },[user])

    const toggleTheme = () => {
        if(theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }
    const navigate = useNavigate();
    const toggleUser = () => {
        if(user.isLogin) {
            setUser({name:'', isLogin:false})
        }
        else {
            setUser({name:'Sarfraz', isLogin:true})
            navigate('/')
        }}
    return (
        <AppContext.Provider value={{theme, toggleTheme, user, toggleUser}} >
            {children}
        </AppContext.Provider>
    )}

  export function ProtectedRoute({ children }) {
  const { user } = useAppContext();

  if (!user.isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



export const useAppContext = () => useContext(AppContext);