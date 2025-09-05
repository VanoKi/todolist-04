import type {taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
  todolistId: string
  title: string
  tasks: taskType[]
  deleteTask: (todolistId: string, taskId:string) => void
  addTask: (todolistId: string, task:string) => void
  changeTaskStatus: (todolistId: string, taskId:string, isDone:boolean) => void
};
export type filterType = 'All' | 'Active' | 'Completed'

export const TodolistItem = (props: Props) => {
  const {todolistId, title, tasks, deleteTask, addTask, changeTaskStatus} = props
  const filters:filterType[] = ['All' , 'Active' , 'Completed']
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<filterType>('All')

  const createTaskHandler = (): void => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      addTask(taskTitle)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }
  const keyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTaskHandler()
    }
    if (e.key === 'Escape') {
      setTaskTitle('')
    }
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }
  const filterTasks = (filter:filterType):taskType[] => {
    switch (filter) {
      case 'Active': {
        return tasks.filter(task => task.isDone === false)
      }
      case 'Completed': {
        return tasks.filter(task => task.isDone === true)
      }
      default: return tasks
    }
  }
  const filtered = filterTasks(filter)

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle}
               onKeyDown={keyDownHandler}
               onChange={changeTaskTitleHandler}
               className={error ? 'error' : ''}
        />
        <Button title={'+'} onClick={createTaskHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {filtered.length === 0 ?
        (<p>There are not tasks</p>)
        :
        (<ul>
        {filtered.map((task:taskType) => {
            const deleteTaskHandler = () => {deleteTask(todolistId, task.id)}
            const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(todolistId, task.id, newStatusValue)
            }

            return (
          <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input
              type={"checkbox"}
              checked={task.isDone}
              onChange={changeTaskStatusHandler}
            />
            <span>{task.title}</span>
            <Button title={'x'} onClick={deleteTaskHandler}/>
          </li>
        )
        }
        )}
      </ul>)}
      <div>
        {filters.map(filterBtn => {
          return (
            <Button
              key={filterBtn}
              title={filterBtn}
              className={filter === filterBtn ? 'active-filter' : ""}
              onClick={() => setFilter(filterBtn)}
            />
          )
        })}
      </div>
    </div>
  );
};