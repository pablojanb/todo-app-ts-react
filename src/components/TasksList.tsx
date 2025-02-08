import { Task } from "./Task"

type TaskList = {
    tasksList: string[]
    handleDeleteTask: (i: number, id: string)=>void
    handleEdit: (i: number, evt: React.MouseEvent<HTMLButtonElement>)=>void
    primaryTheme: boolean
}

export const TasksList = ({tasksList, handleDeleteTask, handleEdit, primaryTheme}: TaskList)=>{
    return (
        <div className="tasksList">
            {tasksList.map((task, i)=>{
                return <Task key={i} task={task} handleDeleteTask={(id: string)=>handleDeleteTask(i,id)} handleEdit={(evt: React.MouseEvent<HTMLButtonElement>)=>handleEdit(i,evt)} primaryTheme={primaryTheme} />
            })}
        </div>
    )
}