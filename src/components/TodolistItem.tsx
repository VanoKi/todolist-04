import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
  title:string
  tasks: taskType[]
  deleteTask: (taskId:string) => void
};
export const TodolistItem = (props: Props) => {
  const {title, tasks,deleteTask} = props
  const filterBtns:filterType[] = ['all', 'active', 'completed']
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <input/>
        <Button title={'+'} onClick={() => {}}/>
      </div>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => {
            return (
              <li key={task.id}>
                <input type={"checkbox"} checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={'x'} onClick={() => deleteTask(task.id)}/>
              </li>
            )
          })
        ) : (
          <div>There are not tasks</div>
        )}
      </ul>
      <div>
        {filterBtns.map(bnt => {
          return (
            <Button title={bnt} onClick={() => {}}/>
          )
        })}
      </div>
    </div>
  );
};