import type {taskType} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
  title: string
  tasks: taskType[]
};
export const TodolistItem = (props: Props) => {
  const {title, tasks} = props
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <button>+</button>
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
            <Button title={'x'}/>
          </li>
        ))}
      </ul>)}
      <div>
        <Button title={'All'}/>
        <Button title={'Active'}/>
        <Button title={'Completed'}/>
      </div>
    </div>
  );
};