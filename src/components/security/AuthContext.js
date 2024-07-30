import { createContext, useContext, useState } from "react";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)

    function authenticate({username, password}){
        if(username === "akk2080" && password === "hello123"){
            setAuthenticated(true)
        }
        else
            setAuthenticated(false)
    }

    return(
        <AuthContext.Provider value = {{isAuthenticated, authenticate}} >
            {children}
        </AuthContext.Provider>
    )

}