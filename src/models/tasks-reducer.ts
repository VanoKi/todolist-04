import type {TaskState, taskType} from "../App.tsx";
import {type Actions, nanoid} from "@reduxjs/toolkit";
import type {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TaskState = {}

export const taskReducer = (state:TaskState = initialState, action:Actions):TaskState => {
  switch (action.type) {
    case 'create_todolist': {
      return {...state, [action.payload.id]:[]}
    }
    case 'delete_todolist': {
      const newState = {...state}
      delete newState[action.payload.id]
      return newState
    }
    case 'delete_task': {
      return {...state, [action.payload.id]:state[action.payload.id].filter(t => t !== action.payload.taskId)}
    }
    case 'add_task': {
      const newTask:taskType = {id: nanoid(), title: action.payload.title, isDone: false}
      return { ...state, [action.payload.id]:[newTask, (state[action.payload.id])]}
    }
    default:
      return state
  }
}

export const deleteTaskAC = (todolistId:string, taskId:string) => {
  return {type: 'delete_task', payload: {id: todolistId, taskId}} as const
}
export const addTaskAC = (todolistId:string, task:string) => {
  return {type: 'add_task', payload: {id:todolistId, title:task}} as const
}
export const changeTaskStatusAC = (todolistId:string, taskId:string, isDone:boolean) => {
  return {type: 'change_task_status', payload: {id: todolistId, taskId, isDone}} as const
}
export const changeTaskTitleAC = (todolistId:string, taskId:string, title:string) => {
  return {type: 'change_task_title', payload: {id: todolistId, taskId, title}} as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type addTaskAction = ReturnType<typeof addTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | addTaskAction | changeTaskTitleAction | changeTaskStatusAction
