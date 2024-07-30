
import {useAuth} from './security/AuthContext'

import {useNavigate} from "react-router-dom"

import {useState} from "react"

function LoginComponent(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [validCred, setValidCred] = useState(false)
    const [notAuthorised, setNotAuthorised] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function updateUsername(event){

        setUsername(event.target.value)
    }

    function UpdatePassword(event){

        setPassword(event.target.value)
    }

    function authenticate(){
        // if(username === "akk2080" && password === "hello123"){
        //     setValidCred(true)
        //     navigate(`/welcome/${username}`)
        // }

        
        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`)
           
        }

        else  setNotAuthorised(true)
        

    }



    return(
        <div className="Login container" >
            <div className="LoginForm">
                <div>
                    {notAuthorised && <div><h3>Invalid credentials</h3></div> }
                </div>
                <div>
                    <label>User Name: </label>
                        <input type="text" name="username" value={username} onChange={updateUsername}/>
                    
                 </div>
                 <div>
                    <label>Password: </label>
                        <input type="password" name="username" value={password} onChange={UpdatePassword}/>
                  
                 </div>
                 <div>
                    <button name="submit" onClick={authenticate}>Submit</button>
                 </div>
                

            </div>

        </div>
    )
}

export default LoginComponent