import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {CreateForm} from "./components/CreateForm.tsx";
import {useTodolistStore} from "./store.ts";

export function App() {
  const todolists = useTodolistStore(state => state.todolists)
  const tasks = useTodolistStore(state => state.tasks)
  const addTodolist = useTodolistStore(state => state.addTodolist)

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
          />
        )
      })}
    </>
  )
}
