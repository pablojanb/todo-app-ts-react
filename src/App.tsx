import { useEffect, useState } from 'react'
import './App.css'
import { TasksList } from './components/TasksList'

function App() {

  const initialTaskList : string[] = JSON.parse(localStorage.getItem('taskslist') || '[]')

  const [task, setTask] = useState<string>("")
  const [tasksList, setTasksList] = useState<string[]>(initialTaskList)
  const [taskCounter, setTaskCounter] = useState<number>(tasksList.length)
  const [editTask, setEditTask] = useState<boolean>(false)
  const [taskIndex, setTaskIndex] = useState<number>(-1)

  const handleAddTask = (taskIndex : number) =>{
    editTask && setEditTask(false)
    if (task.trim() === "") return
    if (taskIndex > -1) {
      tasksList[taskIndex] = task
    } else {
      setTasksList(tasksList => [...tasksList, task])
      setTaskCounter(prev=> prev + 1)
    }
    setTaskIndex(-1)
    setTask("")
  }

  const handleEdit = (index: number)=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    setEditTask(true)
    const taskEdit = tasksList.findIndex((_, i) => i === index)
    setTaskIndex(taskEdit)
    setTask(tasksList[taskEdit])
  }
  
  const handleDeleteTask = (index: number, id: string)=> {
    editTask && setEditTask(false)
    setTaskIndex(-1)
    
    const taskToDelete = document.getElementById(id)
    taskToDelete?.classList.add('animate__zoomOut')

    setTimeout(()=>{
      setTasksList(tasksList.filter((_, i) => i !== index))
      const allTasks = document.querySelectorAll('.task')
      allTasks.forEach(elem=>{
        elem.classList.remove('animate__zoomIn')
        elem.classList.remove('animate__zoomOut')
      })
    },350)

    taskCounter > 0 && setTaskCounter(prev=> prev - 1)
    setTask("")
  }

  useEffect(()=>{
    localStorage.setItem('taskslist', JSON.stringify(tasksList))
  }, [tasksList, task])

  return (
    <div className='container'>
      <h1 className='title'>To Do List {taskCounter !== 0 && `(${taskCounter})`}</h1>
      <input className= 'newTask inputTask' type="text" 
      placeholder='New task'
      value={task}
      onChange={(e) =>setTask(e.target.value)}/>
      <button className= 'newTask btnTask' onClick={()=>{handleAddTask(taskIndex)}}>{editTask ? 'Edit task' : 'Add task'}</button>
      <TasksList tasksList={tasksList} handleDeleteTask={handleDeleteTask} handleEdit={handleEdit}/>
    </div>
  )
}

export default App
