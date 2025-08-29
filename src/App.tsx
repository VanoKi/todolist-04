import './App.css'
import {TodolistItem} from "./components/todolistItem.tsx";
import {nanoid} from "@reduxjs/toolkit";
import {useState} from "react";

export type taskType = {
  id: string
  title: string
  isDone: boolean
}
export type filterType = 'All' | 'Active' | 'Completed'

export const App = () => {

  const [filter, setFilter] = useState<filterType>('All')
  const [tasks, setTasks] = useState<taskType[]>([
    { id: nanoid(), title: 'HTML&CSS', isDone: true },
    { id: nanoid(), title: 'JS', isDone: true },
    { id: nanoid(), title: 'ReactJS', isDone: false },
  ])

  const deleteTask = (taskId:string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  const filterTasks = (filter:filterType):taskType[] => {
    switch (filter) {
      case 'Active': {
        return tasks.filter(task => task.isDone === false)
      }
      case 'Completed': {
        return tasks.filter(task => task.isDone === true)
      }
      default: return tasks
      }
    }

  return (
    <>
      <TodolistItem
        title={'What to do'}
        tasks={filterTasks(filter)}
        deleteTask={deleteTask}
        setFilter={setFilter}
      />
    </>
  )
}

