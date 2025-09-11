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
    default:
      return state
  }
}

export const deleteTaskAC = () => {

}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction
