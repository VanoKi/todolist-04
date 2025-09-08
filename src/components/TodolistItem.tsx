import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {useState} from "react";
import {EditableSpan} from "./EditableSpan.tsx";
import {CreateForm} from "./CreateForm.tsx";

type Props = {
  todolistId:string
  title:string
  tasks: taskType[]
  deleteTask: (todolistId:string,taskId:string) => void
  changeTaskStatus: (todolistId:string, taskId:string, checked:boolean) => void
  changeTaskTitle: (todolistId:string, taskId:string, newTitle:string) => void
  addTask: (todolistId:string, inputTitle: string) => void
  deleteTodolist: (todolistId:string) => void
  changeTodolistTitle: (todolistId:string, title:string) => void
};
export const TodolistItem = (props: Props) => {
  const {todolistId, title, tasks, deleteTask, changeTaskStatus, changeTaskTitle, addTask, deleteTodolist, changeTodolistTitle} = props
  const filterBtns:filterType[] = ['all', 'active', 'completed']
  const [filter, setFilter] = useState<filterType>('all')

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
        <h2><EditableSpan title={title} onChangeInput={(newTitle) => changeTodolistTitle(todolistId, newTitle)}/></h2>
        <Button title={'x'} onClick={deleteTodolistHandler}/>
      </div>
      <CreateForm addItem={(title) => addTask(todolistId, title)}/>
      <ul>
        {filtered.length > 0 ? (
          filtered.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(todolistId, task.id)
            }
            const changeTaskTitleHandler = (newTitle:string) => {
              changeTaskTitle(todolistId, task.id, newTitle)
            }
            return (
              <li key={task.id}>
                <input
                  type={"checkbox"}
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}
                />
                <EditableSpan title={task.title} onChangeInput={changeTaskTitleHandler}/>
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