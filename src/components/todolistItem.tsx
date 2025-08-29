import type {taskType} from "../App.tsx";

type Props = {
  title: string
  tasks: any
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
      <ul>
        {tasks.map((task:taskType) => (
          <li key={task.id}>
            <input
              type={"checkbox"}
              checked={task.isDone}
            />
            <span>{task.title}</span>
            <button title={'x'}/>
          </li>
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};