import {useAuth} from './security/AuthContext'
import {Link} from "react-router-dom"


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

export default Header