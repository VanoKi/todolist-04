import './App.css'
import {useState} from "react";
import {nanoid} from "@reduxjs/toolkit";
import {TodolistItem} from "./components/TodolistItem.tsx";

export type filterType = 'all' | 'active' | 'completed'
export type Todolist ={
  id:string
  title:string
  filter: filterType
}
export type taskType = {
  id:string
  title:string
  isDone:boolean
}


export function App() {

  const nanoid3 = () => nanoid(3)
  const nanoid5 = () => nanoid(5)
  const [todolist, setTodolists] = useState<Todolist[]>([
    {id:nanoid5(), title: 'What to learn', filter: "all"},
    {id:nanoid5(), title: 'What to do', filter: "all"}
  ])
  const [tasks, setTasks] = useState<taskType[]>([
    { id: nanoid3(), title: 'HTML&CSS', isDone: true },
    { id: nanoid3(), title: 'JS', isDone: true },
    { id: nanoid3(), title: 'ReactJS', isDone: false },
  ])

  const deleteTask = (taskId:string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  const changeTaskStatus = (taskId:string) => {
    setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: !task.isDone } : task))
  }

  return (
    <>
      <TodolistItem
        title={'What to learn'}
        tasks={tasks}
        deleteTask={deleteTask}
        changeTaskStatus={changeTaskStatus}
      />
    </>
  )
}
