import './App.css'
import {type filterType, TodolistItem} from "./components/todolistItem.tsx";
import {useReducer} from "react";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import {
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer
} from "./models/todolists-reducer.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./models/tasks-reducer.ts";

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

  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [])
  const [tasks, dispatchTasks] =useReducer(taskReducer, {})

  const deleteTask = (todolistId: string, taskId:string) => {
    dispatchTasks(deleteTaskAC(todolistId, taskId))
  }
  const addTask = (todolistId:string, task:string) => {
    dispatchTasks(addTaskAC(todolistId, task))
  }
  const changeTaskStatus =(todolistId: string, taskId:string, isDone: boolean) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
  }

  const deleteTodolist =(todolistId:string) => {
    const action = deleteTodolistAC(todolistId)
    dispatchTodolists(action)
    dispatchTasks(action)
  }
  const createTodolist = (todolistTitle:string) => {
    const action = createTodolistAC(todolistTitle)
    dispatchTodolists(action)
    dispatchTasks(action)
  }
  const changeTaskTitle = (todolistId:string, taskId:string, title:string) => {
    // setTasks({...tasks, [todolistId]:tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
  }
  const changeTodolistTitle = (todolistId:string, title:string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title))
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
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        )
      })}
    </>
  )
}
