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
  const [positionEdit, setPositionEdit] = useState<number>()

  const handleAddTask = (taskIndex : number) =>{
    setEditTask(false)
    if (task.trim() === "") return
    if (taskIndex > -1) {
      tasksList[taskIndex] = task
      setTimeout(()=>{
        window.scrollTo({
          top: positionEdit,
          behavior: "smooth"
      })
      }, 0)
    } else {
      setTasksList(tasksList => [...tasksList, task])
      setTaskCounter(prev=> prev + 1)
      setTimeout(()=>{
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
      })
      }, 0)
    }
    setTaskIndex(-1)
    setTask("")
  }

  const handleEdit = (index: number, evt: React.MouseEvent<HTMLButtonElement>)=> {
    setPositionEdit(evt.clientY + window.scrollY - 40)
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
    setEditTask(false)
  }

  useEffect(()=>{
    changeTheme(!primaryTheme, setPrimaryTheme)
  }, [])


  useEffect(()=>{
    localStorage.setItem('taskslist', JSON.stringify(tasksList))
  }, [tasksList, task])

  useEffect(()=>{
    localStorage.setItem('primaryTheme', JSON.stringify(primaryTheme))
  }, [primaryTheme])

  return (
    <div className='container mainTheme-secondaryColor'>
      <button className="btnTheme mainTheme-btnTheme" onClick={()=>{changeTheme(primaryTheme, setPrimaryTheme)}}></button>
      <h1 className='title mainTheme-terciaryColor'>To Do List{taskCounter !== 0 && `(${taskCounter})`}</h1>
      <input id="inputTask" className='newTask inputTask mainTheme-mainBorder mainTheme-inputTask' type="text" placeholder='New task' value={task} onChange={(e) =>setTask(e.target.value)}/>
      <div className='btnContainer'>
      <button className='newTask btnTask mainTheme-mainBorder mainTheme-btnTask' onClick={()=>{handleAddTask(taskIndex)}}>{editTask ? 'Edit task' : 'Add task'}</button>
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
