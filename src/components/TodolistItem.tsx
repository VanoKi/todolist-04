import type {filterType, taskType} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
  title:string
  tasks: taskType[]
  deleteTask: (taskId:string) => void
  changeTaskStatus: (taskId:string, checked:boolean) => void
  addTask: () => void
};
export const TodolistItem = (props: Props) => {
  const {title, tasks, deleteTask, changeTaskStatus, addTask} = props
  const filterBtns:filterType[] = ['all', 'active', 'completed']

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <input value={''}/>
        <Button title={'+'} onClick={() => {}}/>
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
        {filterBtns.map(bnt => {
          return (
            <Button title={bnt} onClick={() => {}}/>
          )
        })}
      </div>
    </div>
  );
};