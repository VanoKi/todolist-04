import './App.css'
import {TodolistItem} from "./components/todolistItem.tsx";
import {nanoid} from "@reduxjs/toolkit";

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export const App = () => {

  const tasks1: taskType[] = [
    { id: nanoid(), title: 'HTML&CSS', isDone: true },
    { id: nanoid(), title: 'JS', isDone: true },
    { id: nanoid(), title: 'ReactJS', isDone: false },
  ]

  const removeTask = (taskId:string) => {
    alert(taskId)
  }

  return (
    <>
      <TodolistItem
        title={'What to do'}
        tasks={tasks1}
        removeTask={removeTask}
      />
      <TodolistItem title={'Another one'} tasks={tasks1}/>
    </>
  )
}

