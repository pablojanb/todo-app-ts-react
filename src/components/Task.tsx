import { toCapital } from "../utils/toCapital"

type Task = {
    task: string
    deleteTask: ()=>void
}

export const Task = ({task, deleteTask}: Task)=>{
    return (
        <div className="task">
            <span>{toCapital(task)}</span>
            <button className="btnDelete" onClick={deleteTask}>Delete</button>
        </div>
    )
}