import type {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

export const todolistsReducer = (state:Todolist[] = initialState, action:Actions):any => {
  switch (action.type) {
    case 'delete_todolist' : {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    default: return state
  }
}

export const deleteTodolistAC = (id:string): DeleteTodolistAction => {
  return {type: "delete_todolist", payload: {id}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type Actions = DeleteTodolistAction