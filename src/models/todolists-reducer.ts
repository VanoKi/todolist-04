import type {Todolist} from "../App.tsx";
import {nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const todolistsReducer = (state:Todolist[] = initialState, action:Actions):any => {
  switch (action.type) {
    case 'delete_todolist' : {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'create_todolist': {
      const newTodolist = {id: nanoid(), title: action.payload.title, filter: 'All'}
      return [newTodolist, ...state]
    }
    case 'change_todolist_title': {
      return state.map( tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    }
    default: return state
  }
}

export const deleteTodolistAC = (id:string): DeleteTodolistAction => {
  return {type: "delete_todolist", payload: {id}} as const
}
export const createTodolistAC = (title:string):CreateTodolistAction => {
  return {type: 'create_todolist', payload: {title}}
}
export const changeTodolistTitleAC = (todolistId:string, title:string):ChangeTodolistTitleAction => {
  return {type: 'change_todolist_title', payload: {todolistId, title}}
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction