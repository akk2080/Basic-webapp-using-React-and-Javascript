import { eventWrapper } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import './Todo.css'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider, {useAuth} from './security/AuthContext'


export default function Todo(){

    function AuthenticateUrl({children}){

        const authContext = useAuth()
       
        if(authContext.isAuthenticated)
            return children
       return <Navigate to="/"/>
    }

    
    return(
        <div className="Todo">

            <AuthProvider>

            <BrowserRouter>
                <Header/>
                    <Routes>
                        
                        <Route path = '*' element = {<ErrorComponent/>}></Route>
                        <Route path = '/' element = {<LoginComponent/>}></Route>
                        <Route path = '/login' element = {<LoginComponent/>}></Route>
                        <Route path = '/welcome/:username' element = {<AuthenticateUrl><WelcomeComponent/></AuthenticateUrl>}></Route>
                        <Route path = '/manageTodos' element= {<AuthenticateUrl><TodoList/></AuthenticateUrl>}></Route>
                        <Route path = '/logout' element= {<LogoutComponent/>}></Route>


                    </Routes>
                <Footer/>
        
            </BrowserRouter>

            </AuthProvider>
        
        </div>
    )
}

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

function WelcomeComponent(){

    const{username} = useParams()

    return(
        <div className="Welcome container">
            <h1>Welcome {username}</h1>
            <h2><Link to="/manageTodos">Mannage your todos</Link></h2>
        
        </div>
    )
}

function ErrorComponent(){

    return(
        <div className="Error container">
            
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
       <div className="TodoList container">
        <h1>Your Todos</h1>
            <table className="table">
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

function Footer(){
    return(
       
        <footer className="footer">
            <hr/>
             <div className="conatiner"> Footer</div>
           
        </footer>
    )
}


function Header(){

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/welcome/akk2080">Home</Link>}</li>
                            <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/manageTodos">Todos</Link>}</li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}</li>
                        <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/logout">Logout</Link>}</li>
                    </ul>

                </nav>
            </div>
        </div>
    </header>
    )
}

function LogoutComponent() {

    const authContext = useAuth()

    authContext.logout()
    return (
        <div className="LogoutComponent">
            <h1>You are logged out!</h1>
            <div>
                Thank you for using our App. Come back soon!
            </div>
        </div>

     
    )
}