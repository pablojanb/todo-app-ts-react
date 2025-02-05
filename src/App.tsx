
import { useEffect, useState } from 'react'
import './App.css'
import { TasksList } from './components/TasksList'

function App() {

  const initialTaskList : string[] = JSON.parse(localStorage.getItem('taskslist') || '[]')

  const [task, setTask] = useState<string>("")
  const [tasksList, setTasksList] = useState<string[]>(initialTaskList)
  const [taskCounter, setTaskCounter] = useState(tasksList.length)

  const handleAddTask = () =>{
    if (task.trim() !== "") {
      setTasksList(tasksList => [...tasksList, task])
      setTaskCounter(prev=> prev + 1)
      setTask("")
    }
  }

  const handleDeleteTask = (index: number)=> {
    setTasksList(tasksList=> tasksList.filter((_, i) => i !== index))
    setTaskCounter(prev=> prev - 1)
  }

  useEffect(()=>{
    localStorage.setItem('taskslist', JSON.stringify(tasksList))
  }, [tasksList])

  return (
    <div className='container'>
      <h1 className='title'>To Do List {taskCounter !== 0 && `(${taskCounter})`}</h1>
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
