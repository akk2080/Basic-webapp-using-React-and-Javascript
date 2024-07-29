import { eventWrapper } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import './Todo.css'

export default function Todo(){

    
    return(
        <div className="Todo">
            <LoginComponent/>
        </div>
    )
}

function LoginComponent(){

    const [username, setUsername] = useState('current name')
    const [password, setPassword] = useState('')
    const [validCred, setValidCred] = useState(false)

    function updateUsername(event){

        setUsername(event.target.value)
    }

    function UpdatePassword(event){

        setPassword(event.target.value)
    }

    function authenticate(){
        if(username === "akk2080" && password === "hello123")
                setValidCred(true)
    }



    return(
        <div className="Login">
            <div className="LoginForm">
                <div>
                    {validCred && <div><h1>Success...valid credentials</h1></div> }
                </div>
                <div>
                    <label>Name: 
                        <input type="text" name="username" value={username} onChange={updateUsername}/>
                    </label>
                 </div>
                 <div>
                    <label>Password: 
                        <input type="password" name="username" value={password} onChange={UpdatePassword}/>
                    </label>
                 </div>
                 <div>
                    <button name="submit" onClick={authenticate}>Submit</button>
                 </div>
                

            </div>

        </div>
    )
}