
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
    <div className='container'>
      <h1 className='title'>To Do List</h1>
      <input className= 'newTask inputTask' type="text" 
      placeholder='New task'
      value={task}
      onChange={(e) =>setTask(e.target.value)}/>
      <button className= 'newTask btnTask' onClick={handleAddTask}>Add task</button>
      <TasksList tasksList={tasksList} deleteTask={deleteTask}/>
    </div>
  )
}

export default App
