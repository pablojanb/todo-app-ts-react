import { Task } from "./Task"

type TaskList = {
    tasksList: string[]
    handleDeleteTask: (i: number)=>void
}

export const TasksList = ({tasksList, handleDeleteTask}: TaskList)=>{
    return (
        <div className="tasksList">
            {tasksList.map((task, i)=>{
                return <Task key={i} task={task} handleDeleteTask={()=>handleDeleteTask(i)}/>
            })}
        </div>
    )
}