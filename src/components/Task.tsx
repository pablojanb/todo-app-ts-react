import { toCapital } from "../utils/toCapital"

type Task = {
    task: string
    handleDeleteTask: ()=>void
}

export const Task = ({task, handleDeleteTask}: Task)=>{
    return (
        <div className="task">
            <span>{toCapital(task)}</span>
            <button className="btnDelete" onClick={handleDeleteTask}>Delete</button>
        </div>
    )
}