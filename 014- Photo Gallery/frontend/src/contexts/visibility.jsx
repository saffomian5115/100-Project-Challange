import { useState, createContext, useContext } from "react";

const VisibilityContext = createContext();

export function MyProvider({children}){
    const [uploadFormVisibility, setUploadFormVisibility] = useState(false)

    return <VisibilityContext.Provider value={{uploadFormVisibility, setUploadFormVisibility}}>{children}</VisibilityContext.Provider>
} 

export const useVisibility = () => useContext(VisibilityContext);