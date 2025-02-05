
import { useState } from 'react'
import './App.css'
import { TasksList } from './components/TasksList'

function App() {

  const [task, setTask] = useState<string>("")
  const [tasksList, setTasksList] = useState<string[]>([])

  const handleAddTask = () =>{
    if (task.trim() !== "") {
      setTasksList(tasksList => [...tasksList, task])
      setTask("")
    }
  }

  const deleteTask = (index: number)=> {
    setTasksList(tasksList=> tasksList.filter((_, i) => i !== index))
  }

  return (
    <>
      <input type="text" 
      placeholder='New task'
      value={task}
      onChange={(e) =>setTask(e.target.value)}/>
      <button onClick={handleAddTask}>Add task</button>
      <TasksList tasksList={tasksList} deleteTask={deleteTask}/>
    </>
  )
}

export default App
