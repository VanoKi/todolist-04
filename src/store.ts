import {create} from "zustand/react";
import {nanoid} from "@reduxjs/toolkit";

export type filterType = 'all' | 'active' | 'completed'
export type Todolist ={
  id:string
  title:string
  filter: filterType
}
export type taskType = {
  id:string
  title:string
  isDone:boolean
}

type State = {
  todolists: Todolist[]
  tasks: Record<string, taskType[]>
}

type Actions = {
  addTask: (todolistId:string, inputTitle: string) => void
  deleteTask: (todolistId:string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId:string, checked:boolean) => void
  addTodolist: (title:string) => void
  deleteTodolist: (todolistId:string) => void
  changeTaskTitle: (todolistId:string, taskId:string, newTitle:string) => void
  changeTodolistTitle: (todolistId:string, newTitle:string) => void
}

export const useTodolistStore = create<State & Actions>((set) => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()

  return {
    todolists: [
      {id:todolistId1, title: 'What to learn', filter: "all"},
      {id:todolistId2, title: 'What to do', filter: "all"}
    ],
    tasks: {
      [todolistId1]: [
        { id: nanoid(), title: 'HTML&CSS', isDone: true },
        { id: nanoid(), title: 'JS', isDone: true },
        { id: nanoid(), title: 'ReactJS', isDone: false },
      ],
      [todolistId2]: [
        { id: nanoid(), title: 'Rest API', isDone: true },
        { id: nanoid(), title: 'GraphQL', isDone: false },
      ],
    },
    addTask: (todolistId, inputTitle) =>
      set((state) => {
        const newTask: taskType = {id:nanoid(), title: inputTitle, isDone: false}
        return {
          tasks: {
            ...state.tasks,
            [todolistId]:[newTask, ...state.tasks[todolistId]]
          }
        }
      }),

    deleteTask: (todolistId, taskId) =>
      set((state) => ({
        tasks: {
          ...state.tasks,
          [todolistId]:state.tasks[todolistId].filter(t => t.id !== taskId)
        }
      })),

    changeTaskStatus: (todolistId, taskId, checked) =>
      set((state) => ({
        tasks: {
          ...state.tasks,
          [todolistId]:state.tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: checked} : t)
        }
      })),

    addTodolist: (title) =>
      set((state) => {
        const newId = nanoid()
        return {
          todolists: [...state.todolists, {id:newId, title, filter: 'all'}],
          tasks: {...state.tasks, [newId]:[]}
        }
      }),

    deleteTodolist: (todolistId) =>
      set((state) => {
        const newTodolist = state.todolists.filter(tl => tl.id !== todolistId)
        const {[todolistId]: _, ...restTasks} = state.tasks
        return {todolists: newTodolist, tasks: restTasks}
      }),

    changeTaskTitle: (todolistId, taskId, newTitle) =>
      set((state) => ({
        tasks: {
          ...state.tasks,
          [todolistId]:state.tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        }
      })),

    changeTodolistTitle: (todolistId, newTitle) =>
      set((state) => ({
        todolists: state.todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)
      })),

  }
})