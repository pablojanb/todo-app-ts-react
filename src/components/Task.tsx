import { toCapital } from "../utils/toCapital"

type Task = {
    task: string
    handleDeleteTask: ()=>void
    handleEdit: ()=>void
}

export const Task = ({task, handleDeleteTask, handleEdit}: Task)=>{
    return (
        <div className="task animate__animated animate__zoomIn">
            <span>{toCapital(task)}</span>
            <div className="btnsTask">
                <button className="btnEdit" onClick={handleEdit}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btnDelete" onClick={handleDeleteTask}><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    )
}