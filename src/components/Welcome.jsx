import {Link, useParams} from "react-router-dom"


function WelcomeComponent(){

    const{username} = useParams()

    return(
        <div className="Welcome container">
            <h1>Welcome {username}</h1>
            <h2><Link to="/manageTodos">Mannage your todos</Link></h2>
        
        </div>
    )
}

export default WelcomeComponent