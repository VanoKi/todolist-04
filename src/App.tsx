import './App.css'
import {TodolistItem} from "./components/todolistItem.tsx";

export type taskType = {
  id: number
  title: string
  isDone: boolean
}

export const App = () => {

  const tasks1: taskType[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ]

  const tasks2: taskType[] = []

  return (
    <>
      <TodolistItem
        title={'What to do'}
        tasks={tasks1}
      />
      <TodolistItem title={'another one'} tasks={tasks2}/>
    </>
  )
}

