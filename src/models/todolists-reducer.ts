import type {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

export const todolistsReducer = (state:Todolist[] = initialState, action:any):any => {
  switch (action.type) {
    case 'delete_todolist' : {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    default: return state
  }
}
export type DeleteTodolistActtion = {
  type: 'delete_todolist'
  payload: {id:string}
}
type Actions = DeleteTodolistActtion

export const deleteTodolistAC = (id:string): DeleteTodolistActtion => {
  return {type: "delete_todolist", payload: {id}} as const
}