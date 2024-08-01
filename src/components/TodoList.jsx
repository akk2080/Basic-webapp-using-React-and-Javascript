import { useEffect, useState } from "react";
import { retrieveAllTodosForUsernameApi, deleteTodoApi} from "./Api/TodoApiService";
import { useAuth } from "./security/AuthContext";

function TodoList(){

    const [todos, setTodos] = useState([])

    const AuthContext = useAuth()

    const username = AuthContext.username

    const [message, setMessage] = useState(null)

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    
    // const todos = [ {id: 1, description: 'Complete the coding problem 1', targetDate: targetDate, done: false },

    //                 {id: 2, description: 'Complete the coding problem 2', targetDate: targetDate, done: false },

    //                 {id: 3, description: 'Complete the coding problem 3', targetDate: targetDate, done: false }

    //             ]


    useEffect( () => refreshTodos(), [])

    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }


    function deleteTodo(id){
        deleteTodoApi(username, id)
        .then(() => { setMessage(`delete of todo id = ${id} is successful`)
            refreshTodos()})
        .catch(error => console.log(error))
    }
    

    return(
       <div className="TodoList container">
        <h1>Your Todos</h1>
        {message && <div className="alert alert-warning">{message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        {/* <th>Id</th> */}
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Done</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        todos.map(
                            todo => (
                                <tr key = {todo.id}>
                                    {/* <td>{todo.id}</td> */}
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>DELETE</button></td>
                                </tr>
                            )
                        )
                    }

                </tbody>

            </table>
       </div>
    )
}




export default TodoList
