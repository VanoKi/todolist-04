import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
  title: string
  tasks: taskType[]
  deleteTask: (taskId:string) => void
  setFilter: (filter: string) => void
  addTask: (task:string) => void
  changeTaskStatus: (taskId:string, isDone:boolean) => void
  filter: filterType
};

export const TodolistItem = (props: Props) => {
  const {title, tasks, deleteTask, setFilter, addTask, changeTaskStatus, filter} = props
  const filters = ['All' , 'Active' , 'Completed']
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

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
      {tasks.length === 0 ?
        (<p>There are not tasks</p>)
        :
        (<ul>
        {tasks.map((task:taskType) => {
            const deleteTaskHandler = () => {deleteTask(task.id)}
            const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, newStatusValue)
            }

            return (
          <li key={task.id}>
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
        {/*<Button title={'All'} onClick={() => setFilter('All')} className={}/>*/}
        {/*<Button title={'Active'} onClick={() => setFilter('Active')} className={}/>*/}
        {/*<Button title={'Completed'} onClick={() => setFilter('Completed')} className={}/>*/}
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