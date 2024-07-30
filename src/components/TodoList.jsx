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




export default TodoList
