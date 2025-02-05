type Task = {
    task: string
    deleteTask: ()=>void
}


export const Task = ({task, deleteTask}: Task)=>{
    return (
        <div className="task">
            <span>{task}</span>
            <button className="btnDelete" onClick={deleteTask}>Delete</button>
        </div>
    )
}