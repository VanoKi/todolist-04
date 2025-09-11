import type {TaskState} from "../App.tsx";
import type {Actions} from "@reduxjs/toolkit";

const initialState: TaskState = {}

export const taskReducer = (state:TaskState = initialState, action:Actions):TaskState => {
  switch (action.type) {
    case '' {
      return state
    }
    default:
      return state
  }
}

type Actions = any