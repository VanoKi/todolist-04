import './App.css'
import {type filterType, TodolistItem} from "./components/todolistItem.tsx";
import {nanoid} from "@reduxjs/toolkit";
import {useState} from "react";
import {CreateItemForm} from "./components/CreateItemForm.tsx";

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
export type TaskState = {
  [key:string]: taskType[]
}

export const App = () => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()
  const [todolists, setTodolists] = useState<Todolist[]>([
    {id:todolistId1, title: 'What to learn', filter: "All"},
    {id:todolistId2, title: 'What to do', filter: "All"}
  ])
  const [tasks, setTasks] = useState<TaskState>({
    [todolistId1]:[
      { id: nanoid(), title: 'HTML&CSS', isDone: true },
      { id: nanoid(), title: 'JS', isDone: true },
      { id: nanoid(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]:[
      { id: nanoid(), title: 'Rest API', isDone: true },
      { id: nanoid(), title: 'GraphQL', isDone: false },
    ]
  })

  const deleteTask = (todolistId: string, taskId:string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(task => task.id !== taskId)})
  }
  const addTask = (todolistId:string, task:string) => {
    const newTask = {id: nanoid(), title: task, isDone: false}
    setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]] })
  }
  const changeTaskStatus =(todolistId: string, taskId:string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId]
        .map(task => task.id === taskId ? {...task, isDone} : task)})
  }

  const deleteTodolist =(todolistId:string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }
  const createTodolist = (todolistTitle:string) => {
    const todolistId = nanoid()
    const newTodolist:Todolist = {id:todolistId, title: todolistTitle, filter: 'All'}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [todolistId]:[]})
  }

  return (
    <>
      <CreateItemForm onCreateItem={createTodolist}/>
      {todolists.map(tl => {
        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            deleteTask={deleteTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
          />
        )
      })}
    </>
  )
}
