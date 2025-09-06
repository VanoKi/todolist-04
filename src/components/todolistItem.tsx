import type {taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
  todolistId: string
  title: string
  tasks: taskType[]
  deleteTask: (todolistId: string, taskId:string) => void
  addTask: (todolistId: string, task:string) => void
  changeTaskStatus: (todolistId: string, taskId:string, isDone:boolean) => void
  deleteTodolist: (todolistId:string) => void
  changeTaskTitle: (todolistId:string, taskId:string, title:string) => void
};
export type filterType = 'All' | 'Active' | 'Completed'

export const TodolistItem = (props: Props) => {
  const {todolistId, title, tasks, deleteTask, addTask, changeTaskStatus, deleteTodolist, changeTaskTitle} = props
  const filters:filterType[] = ['All' , 'Active' , 'Completed']
  const [filter, setFilter] = useState<filterType>('All')

  const createTaskHandler = (title:string): void => {
    addTask(todolistId, title)
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
      <div className={'container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={() => deleteTodolist(todolistId)}/>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler}/>
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
            const changeTaskTitleHandler = (title:string) => {
              changeTaskTitle(todolistId, task.id, title)
            }
            return (
          <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input
              type={"checkbox"}
              checked={task.isDone}
              onChange={changeTaskStatusHandler}
            />
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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