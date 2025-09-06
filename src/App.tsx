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

  const todolistId1 =  nanoid()
  const todolistId2 =  nanoid()
  const [todolists, setTodolists] = useState<Todolist[]>([
    {id:todolistId1, title: 'What to learn', filter: "all"},
    {id:todolistId2, title: 'What to do', filter: "all"}
  ])
  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: nanoid(), title: 'HTML&CSS', isDone: true },
      { id: nanoid(), title: 'JS', isDone: true },
      { id: nanoid(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: nanoid(), title: 'Rest API', isDone: true },
      { id: nanoid(), title: 'GraphQL', isDone: false },
    ],
  })

  const deleteTask = (todolistId:string, taskId:string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== taskId)})
  }
  const changeTaskStatus = (todolistId:string, taskId:string, checked: boolean) => {
    // setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: checked } : task))
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: checked} : t)})
  }
  const addTask =(todolistId:string, inputTitle:string) => {
    const newTask:taskType = {id: nanoid(), title: inputTitle, isDone: false}
    // setTasks([newTask, ...tasks])
    setTasks({...tasks, [todolistId]:tasks[todolistId]})
  }

  // const addTodolist = (title:string) => {
  //
  // }
  const deleteTodolist = (todolistId:string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
  }

  return (
    <>
      {todolists.map(tl => {
        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            deleteTask={deleteTask}
            changeTaskStatus={changeTaskStatus}
            addTask={addTask}
            deleteTodolist={deleteTodolist}
          />
        )
      })}
    </>
  )
}
