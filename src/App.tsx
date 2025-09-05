import './App.css'
import {type filterType, TodolistItem} from "./components/todolistItem.tsx";
import {nanoid} from "@reduxjs/toolkit";
import {useState} from "react";

export type taskType = {
  id: string
  title: string
  isDone: boolean
}
export type Todolist = {
  id:string
  title:string
  filter:filterType
}

export const App = () => {

  const nanoid3 = () => nanoid(3)
  const nanoid5 = () => nanoid(5)

  const todolistId1 = nanoid5()
  const todolistId2 = nanoid5()
  const [todolists, setTodolists] = useState<Todolist[]>([
    {id:todolistId1, title: 'What to learn', filter: "All"},
    {id:todolistId2, title: 'What to do', filter: "All"}
  ])
  const [tasks, setTasks] = useState({
    [todolistId1]:[
      { id: nanoid3(), title: 'HTML&CSS', isDone: true },
      { id: nanoid3(), title: 'JS', isDone: true },
      { id: nanoid3(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]:[
      { id: nanoid3(), title: 'Rest API', isDone: true },
      { id: nanoid3(), title: 'GraphQL', isDone: false },
    ]
  })

  const deleteTask = (taskId:string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  const addTask = (task:string) => {
    const newTask = {id: nanoid3(), title: task, isDone: false}
    setTasks([newTask, ...tasks])
  }
  const changeTaskStatus =(taskId:string, isDone: boolean) => {
    setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task))
  }

  return (
    <>
      {todolists.map(tl => {
        return (
          <TodolistItem
            key={tl.id}
            title={tl.title}
            tasks={tasks}
            deleteTask={deleteTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
          />
        )
      })}
    </>
  )
}
