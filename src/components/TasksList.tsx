import { Task } from "./Task"

type TaskList = {
    tasksList: string[]
    handleDeleteTask: (i: number)=>void
    handleEdit: (i: number)=>void
}

export const TasksList = ({tasksList, handleDeleteTask, handleEdit}: TaskList)=>{
    return (
        <div className="tasksList">
            {tasksList.map((task, i)=>{
                return <Task key={i} task={task} handleDeleteTask={()=>handleDeleteTask(i)} handleEdit={()=>handleEdit(i)} />
            })}
        </div>
    )
}