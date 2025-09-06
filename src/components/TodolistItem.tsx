import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {useState, type KeyboardEvent, type ChangeEvent} from "react";

type Props = {
  todolistId:string
  title:string
  tasks: taskType[]
  deleteTask: (taskId:string) => void
  changeTaskStatus: (taskId:string, checked:boolean) => void
  addTask: (inputTitle: string) => void
  deleteTodolist: (todolistId:string) => void
};
export const TodolistItem = (props: Props) => {
  const {todolistId, title, tasks, deleteTask, changeTaskStatus, addTask, deleteTodolist} = props
  const filterBtns:filterType[] = ['all', 'active', 'completed']
  const [inputTitle, setInputTitle] = useState<string>('')
  const [error, setError] = useState<null|string>(null)
  const [filter, setFilter] = useState<filterType>('all')

  const addTaskHandler = () => {
    const trimmedTitle = inputTitle.trim()
    if (trimmedTitle) {
      addTask(trimmedTitle)
      setInputTitle('')
      setError(null)
    } else {
      setError('Title is required')
    }
  }
  const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
    if (e.key === 'Escape') {
      setInputTitle('')
    }
  }
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
    if (error !== null) {
      setError(null)
    }
  }
  const filteredTasks =(filter:filterType) => {
    switch (filter) {
      case 'active': {
        return tasks.filter(task => !task.isDone )
      }
      case 'completed': {
        return tasks.filter(task => task.isDone)
      }
      default: return tasks
    }
  }
  const filtered = filteredTasks(filter)

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <Button title={'x'} onClick={deleteTodolistHandler}/>
      </div>
      <div>
        <input
          value={inputTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button title={'+'} onClick={addTaskHandler}/>
        {error && <div>{error}</div>}
      </div>
      <ul>
        {filtered.length > 0 ? (
          filtered.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }
            return (
              <li key={task.id}>
                <input
                  type={"checkbox"}
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button title={'x'} onClick={deleteTaskHandler}/>
              </li>
            )
          })
        ) : (
          <p>Task list is empty</p>
        )}
      </ul>
      <div>
        {filterBtns.map(btn => {
          return (
            <Button title={btn} onClick={() => setFilter(btn)} key={btn}/>
          )
        })}
      </div>
    </div>
  );
};