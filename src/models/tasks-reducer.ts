import type {TaskState} from "../App.tsx";
import type {Actions} from "@reduxjs/toolkit";
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
    default:
      return state
  }
}

export const deleteTaskAC = (todolistId:string, taskId:string) => {
  return {type: 'delete_task', payload: {id: todolistId, taskId}}
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction
