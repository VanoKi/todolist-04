import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
  title: string
  tasks: taskType[]
  deleteTask?: (taskId:string) => void
  setFilter: (filter:filterType) => void
};
export const TodolistItem = (props: Props) => {
  const {title, tasks, deleteTask, setFilter} = props
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <Button title={'+'} onClick={() => alert('click')}/>
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