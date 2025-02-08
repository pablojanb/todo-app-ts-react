import { useEffect, useState } from 'react'
import './App.css'
import { TasksList } from './components/TasksList'
import { changeTheme } from './utils/changeTheme'

function App() {

  const initialTaskList : string[] = JSON.parse(localStorage.getItem('taskslist') || '[]')
  const initialPrimaryTheme : boolean = JSON.parse(localStorage.getItem('primaryTheme') || 'true')

  const [task, setTask] = useState<string>("")
  const [tasksList, setTasksList] = useState<string[]>(initialTaskList)
  const [taskCounter, setTaskCounter] = useState<number>(tasksList.length)
  const [editTask, setEditTask] = useState<boolean>(false)
  const [taskIndex, setTaskIndex] = useState<number>(-1)
  const [primaryTheme, setPrimaryTheme] = useState<boolean>(initialPrimaryTheme)

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
    setTimeout(()=>{
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
    }, 0)
  }

  const handleEdit = (index: number)=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    const inputTask = document.getElementById('inputTask')
    inputTask?.focus()
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

  const handleClearAll = ()=>{
    setTasksList([])
    setTask("")
    setTaskCounter(0)
  }

  useEffect(()=>{
    localStorage.setItem('taskslist', JSON.stringify(tasksList))
  }, [tasksList, task])

  useEffect(()=>{
    localStorage.setItem('primaryTheme', JSON.stringify(primaryTheme))
  }, [primaryTheme])

  return (
    <div className={primaryTheme ? 'container mainTheme-secondaryColor' : 'container secondaryTheme-secondaryColor'}>
      <button className={primaryTheme ? "btnTheme mainTheme-btnTheme" : "btnTheme secondaryTheme-btnTheme"}
      onClick={()=>{changeTheme(primaryTheme, setPrimaryTheme)}}></button>
      <h1 className={primaryTheme ? 'title mainTheme-terciaryColor' : 'title secondaryTheme-terciaryColor'}>To Do List{taskCounter !== 0 && `(${taskCounter})`}</h1>
      <input id="inputTask" className= {primaryTheme ? 'newTask inputTask mainTheme-mainBorder mainTheme-inputTask' : 'newTask inputTask mainTheme-mainBorder secondaryTheme-inputTask'}
      type="text" 
      placeholder='New task'
      value={task}
      onChange={(e) =>setTask(e.target.value)}/>
      <div className='btnContainer'>
      <button className= {primaryTheme ? 'newTask btnTask mainTheme-mainBorder mainTheme-btnTask' : 'newTask btnTask secondaryTheme-mainBorder secondaryTheme-btnTask'}
      onClick={()=>{handleAddTask(taskIndex)}}>{editTask ? 'Edit task' : 'Add task'}</button>
      {
        tasksList.length > 1 &&
        <button className= {primaryTheme? 'newTask btnClear mainTheme-mainBorder mainTheme-btnClear' : 'newTask btnClear secondaryTheme-mainBorder secondaryTheme-btnClear'}
        onClick={handleClearAll}>Clear all</button>
      }
      </div>
      <TasksList tasksList={tasksList} handleDeleteTask={handleDeleteTask} handleEdit={handleEdit} primaryTheme={primaryTheme}/>
    </div>
  )
}

export default App
