import { Task } from "./Task"

type TaskList = {
    tasksList: string[]
    handleDeleteTask: (i: number, id: string)=>void
    handleEdit: (i: number)=>void
    primaryTheme: boolean
}

export const TasksList = ({tasksList, handleDeleteTask, handleEdit, primaryTheme}: TaskList)=>{
    return (
        <div className="tasksList">
            {tasksList.map((task, i)=>{
                return <Task key={i} task={task} handleDeleteTask={(id: string)=>handleDeleteTask(i,id)} handleEdit={()=>handleEdit(i)} primaryTheme={primaryTheme} />
            })}
        </div>
    )
}