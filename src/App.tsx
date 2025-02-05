
import { useEffect, useState } from 'react'
import './App.css'
import { TasksList } from './components/TasksList'

function App() {

  const initialTaskList : string[] = JSON.parse(localStorage.getItem('taskslist') || '[]')

  const [task, setTask] = useState<string>("")
  const [tasksList, setTasksList] = useState<string[]>(initialTaskList)

  const handleAddTask = () =>{
    if (task.trim() !== "") {
      setTasksList(tasksList => [...tasksList, task])
      setTask("")
    }
  }

  const handleDeleteTask = (index: number)=> {
    setTasksList(tasksList=> tasksList.filter((_, i) => i !== index))
  }

  useEffect(()=>{
    localStorage.setItem('taskslist', JSON.stringify(tasksList))
  }, [tasksList])

  return (
    <div className='container'>
      <h1 className='title'>To Do List</h1>
      <input className= 'newTask inputTask' type="text" 
      placeholder='New task'
      value={task}
      onChange={(e) =>setTask(e.target.value)}/>
      <button className= 'newTask btnTask' onClick={handleAddTask}>Add task</button>
      <TasksList tasksList={tasksList} handleDeleteTask={handleDeleteTask}/>
    </div>
  )
}

export default App
