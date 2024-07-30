import { eventWrapper } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import './Todo.css'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Todo(){

    
    return(
        <div className="Todo">

            <BrowserRouter>
                    <Routes>
                        <Route path = '*' element = {<ErrorComponent/>}></Route>
                        <Route path = '/' element = {<LoginComponent/>}></Route>
                        <Route path = '/login' element = {<LoginComponent/>}></Route>
                        <Route path = '/welcome/:username' element = {<WelcomeComponent/>}></Route>
                        <Route path = '/manageTodos' element= {<TodoList/>}></Route>


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
            navigate(`/welcome/${username}`)
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

    const{username} = useParams()

    return(
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <h2><Link to="/manageTodos">Mannage your todos</Link></h2>
        
        </div>
    )
}

function ErrorComponent(){

    return(
        <div className="Error">
            
            <h1>Oops something went wrong!!!</h1>
            <h2>Please recheck the URL and try again</h2>

        </div>
    )
}

function TodoList(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    
    const todos = [ {id: 1, description: 'Complete the coding problem 1', targetDate: targetDate, done: false },

                    {id: 2, description: 'Complete the coding problem 2', targetDate: targetDate, done: false },

                    {id: 3, description: 'Complete the coding problem 3', targetDate: targetDate, done: false }

                ]

    return(
       <div className="TodoList">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Done</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        todos.map(
                            todo => (
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                    <td>{todo.done.toString()}</td>
                                </tr>
                            )
                        )
                    }

                </tbody>

            </table>
       </div>
    )
                    
       
    
}