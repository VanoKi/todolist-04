import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
  title: string
  tasks: taskType[]
  deleteTask: (taskId:string) => void
  setFilter: (filter:filterType) => void
  addTask: (task:string) => void
};

export const TodolistItem = (props: Props) => {

  const {title, tasks, deleteTask, setFilter, addTask} = props
  const [taskTitle, setTaskTitle] = useState('')
  const createTaskHandler = (): void => {
    addTask(taskTitle)
    setTaskTitle('')
  }
  const keyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTaskHandler()
    }
    if (e.key === 'Escape') {
      setTaskTitle('')
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle}
               onKeyDown={keyDownHandler}
               onChange={e => setTaskTitle(e.currentTarget.value)}
        />
        <Button title={'+'} onClick={createTaskHandler}/>
      </div>
      {tasks.length === 0 ?
        (<p>There are not tasks</p>)
        :
        (<ul>
        {tasks.map((task:taskType) => {
            const deleteTaskHandler = () => {deleteTask(task.id)}
            return (
          <li key={task.id}>
            <input
              type={"checkbox"}
              checked={task.isDone}
            />
            <span>{task.title}</span>
            <Button title={'x'} onClick={deleteTaskHandler}/>
          </li>
        )
        }
        )}
      </ul>)}
      <div>
        <Button title={'All'} onClick={() => setFilter('All')}/>
        <Button title={'Active'} onClick={() => setFilter('Active')}/>
        <Button title={'Completed'} onClick={() => setFilter('Completed')}/>
      </div>
    </div>
  );
};