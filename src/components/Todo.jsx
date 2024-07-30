import { eventWrapper } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import './Todo.css'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider, {useAuth} from './security/AuthContext'

import ErrorComponent from "./ErrorComponent";
import LoginComponent from "./Login";
import WelcomeComponent from "./Welcome";
import TodoList from "./TodoList";
import LogoutComponent from "./Logout";
import Header from "./Header";
import Footer from "./Footer";



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












