import './App.css'
import {TodolistItem} from "./components/todolistItem.tsx";
import {nanoid} from "@reduxjs/toolkit";
import {useState} from "react";

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export const App = () => {

  const [tasks, setTasks] = useState<taskType[]>([
    { id: nanoid(), title: 'HTML&CSS', isDone: true },
    { id: nanoid(), title: 'JS', isDone: true },
    { id: nanoid(), title: 'ReactJS', isDone: false },
  ])

  const removeTask = (taskId:string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  return (
    <>
      <TodolistItem
        title={'What to do'}
        tasks={tasks}
        removeTask={removeTask}
      />
      <TodolistItem title={'Another one'} tasks={tasks}/>
    </>
  )
}

