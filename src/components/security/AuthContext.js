import { createContext, useContext, useState } from "react";
import { apiClient } from "../Api/TodoApiService";
import { executeBasicAuthenticationService } from "../Api/TodoApiService";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    //const token = 'Basic ' + window.btoa(username + ':' + password)



    async function login(username, password){

       const currToken = 'Basic ' + window.btoa(username + ":" + password)

      

       try{

        const response = await executeBasicAuthenticationService(currToken)
        if(response.status === 200){
            setAuthenticated(true)
            setUsername(username)
            setToken(currToken)

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = currToken
                    return config
                })

            return true
        }
        else{
            logout()
            return false
        }
       }catch(error){
        logout()
        return false
       }

        // if(username === 'akk2080' && password === 'hello123'){
        //     setAuthenticated(true)
        //     setUsername(username)
        //     return true
        // }
        // else
        //     setUsername(null)
        //     setAuthenticated(false)
        //     return false
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
        
    }

    return(
        <AuthContext.Provider value = {{isAuthenticated, login, logout, username, token}} >
            {children}
        </AuthContext.Provider>
    )

}