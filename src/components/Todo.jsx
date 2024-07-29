import { eventWrapper } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import './Todo.css'
import { Navigate, useNavigate } from "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Todo(){

    
    return(
        <div className="Todo">

            <BrowserRouter>
                    <Routes>
                        <Route path = '/' element = {<LoginComponent/>}></Route>
                        <Route path = '/login' element = {<LoginComponent/>}></Route>
                        <Route path = '/welcome' element = {<WelcomeComponent/>}></Route>

                    </Routes>
        
            </BrowserRouter>
        
        </div>
    )
}

function LoginComponent(){

    const [username, setUsername] = useState('current name')
    const [password, setPassword] = useState('')
    const [validCred, setValidCred] = useState(false)

    const navigate = useNavigate()

    function updateUsername(event){

        setUsername(event.target.value)
    }

    function UpdatePassword(event){

        setPassword(event.target.value)
    }

    function authenticate(){
        if(username === "akk2080" && password === "hello123"){
            setValidCred(true)
            navigate('/welcome')
        }
                
            
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

function WelcomeComponent(){
    return(
        <div className="Welcome">
            <h1>Welcome </h1>
        </div>
    )
}