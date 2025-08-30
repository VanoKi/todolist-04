import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {useRef} from "react";

type Props = {
  title: string
  tasks: taskType[]
  deleteTask?: (taskId:string) => void
  setFilter: (filter:filterType) => void
  addTask: (task:string) => void
};

export const TodolistItem = (props: Props) => {

  const {title, tasks, deleteTask, setFilter, addTask} = props
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={inputRef}/>
        <Button title={'+'} onClick={() => {
          if (inputRef.current) {
            addTask(inputRef.current.value)
        }}}/>
      </div>
      {tasks.length === 0 ?
        (<p>There are not tasks</p>)
        :
        (<ul>
        {tasks.map((task:taskType) => (
          <li key={task.id}>
            <input
              type={"checkbox"}
              checked={task.isDone}
            />
            <span>{task.title}</span>
            <Button title={'x'} onClick={() => deleteTask?.(task.id)}/>
          </li>
        ))}
      </ul>)}
      <div>
        <Button title={'All'} onClick={() => setFilter('All')}/>
        <Button title={'Active'} onClick={() => setFilter('Active')}/>
        <Button title={'Completed'} onClick={() => setFilter('Completed')}/>
      </div>
    </div>
  );
};