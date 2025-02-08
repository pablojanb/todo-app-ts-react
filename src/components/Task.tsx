import { toCapital } from "../utils/toCapital"

type Task = {
    task: string
    handleDeleteTask: (id:string)=>void
    handleEdit: ()=>void
    primaryTheme: boolean
}

export const Task = ({task, handleDeleteTask, handleEdit, primaryTheme}: Task)=>{
    const id = crypto.randomUUID()
    return (
        <div id={id} className={primaryTheme ? "task mainTheme-mainBorder mainTheme-task animate__animated animate__zoomIn" : "task secondaryTheme-mainBorder secondaryTheme-task animate__animated animate__zoomIn"}>
            <span>{toCapital(task)}</span>
            <div className="btnsTask">
                <button className={primaryTheme ? "btnEdit mainTheme-btns-task" : "btnEdit secondaryTheme-btns-task"} onClick={handleEdit}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className={primaryTheme ? "btnDelete mainTheme-btns-task" : "btnDelete secondaryTheme-btns-task"}
                onClick={()=>{handleDeleteTask(id)}}><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    )
}