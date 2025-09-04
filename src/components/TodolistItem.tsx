import type {taskType} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
  title:string
  tasks: taskType[]
};
export const TodolistItem = (props: Props) => {
  const {title, tasks,} = props
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => {
            return (
              <li>
                <input type={"checkbox"} checked={task.isDone}/>
                <span>{task.title}</span>
                {/*<Button title={'x'} onClick={() => {}}*/}
              </li>
            )
          })
        ) : (
          <div>There are not tasks</div>
        )}
      </ul>
    </div>
  );
};