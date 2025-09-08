import './App.css'
import {useState} from "react";
import {nanoid} from "@reduxjs/toolkit";
import {TodolistItem} from "./components/TodolistItem.tsx";
import {CreateForm} from "./components/CreateForm.tsx";

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
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: checked} : t)})
  }
  const addTask =(todolistId:string, inputTitle:string) => {
    const newTask:taskType = {id: nanoid(), title: inputTitle, isDone: false}
    setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
  }
  const addTodolist = (title:string) => {
    const newTodolistId = nanoid()
    const newTodolist = {id:newTodolistId, title, filter: "all"}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [newTodolistId]:[]})
  }
  const deleteTodolist = (todolistId:string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
  }
  const changeTaskTitle = (todolistId:string, taskId:string, newTitle:string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
  }
  const changeTodolistTitle = (todolistId:string, title:string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
  }

  return (
    <>
      <CreateForm addItem={addTodolist}/>
      {todolists.map(tl => {
        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            deleteTask={deleteTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            addTask={addTask}
            deleteTodolist={deleteTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        )
      })}
    </>
  )
}
