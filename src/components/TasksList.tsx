import { Task } from "./Task"

type TaskList = {
    tasksList: string[]
    deleteTask: (i: number)=>void
}

export const TasksList = ({tasksList, deleteTask}: TaskList)=>{
    return (
        <div className="tasksList">
            {tasksList.map((task, i)=>{
                return <Task key={i} task={task} deleteTask={()=>deleteTask(i)}/>
            })}
        </div>
    )
}