import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
  title:string
  tasks: taskType[]
};
export const TodolistItem = (props: Props) => {
  const {title, tasks,} = props
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
              <li>
                <input type={"checkbox"} checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={'x'} onClick={() => {}}/>
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