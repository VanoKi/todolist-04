import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {useState} from "react";

type Props = {
  title:string
  tasks: taskType[]
  deleteTask: (taskId:string) => void
  changeTaskStatus: (taskId:string, checked:boolean) => void
  addTask: (inputTitle: string) => void
};
export const TodolistItem = (props: Props) => {
  const {title, tasks, deleteTask, changeTaskStatus, addTask} = props
  const filterBtns:filterType[] = ['all', 'active', 'completed']
  const [inputTitle, setInputTitle] = useState('')
  const addTaskHandler = () => {
    const trimmedTitle = inputTitle.trim()
    if (trimmedTitle) {
      addTask(trimmedTitle)
      setInputTitle('')
    } else {

    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <input
          value={inputTitle}
          onChange={(e) => setInputTitle(e.currentTarget.value)}
        />
        <Button title={'+'} onClick={addTaskHandler}/>
      </div>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => {
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
          <div>There are not tasks</div>
        )}
      </ul>
      <div>
        {filterBtns.map(btn => {
          return (
            <Button title={btn} onClick={() => {}} key={btn}/>
          )
        })}
      </div>
    </div>
  );
};