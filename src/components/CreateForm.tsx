import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
  addItem: (item:string) => void
};
export const CreateForm = ({addItem}: Props) => {

  const [inputTitle, setInputTitle] = useState<string>('')
  const [error, setError] = useState<null|string>(null)

  const addTaskHandler = () => {
    const trimmedTitle = inputTitle.trim()
    if (trimmedTitle) {
      addItem(trimmedTitle)
      setInputTitle('')
      setError(null)
    } else {
      setError('Title is required')
    }
  }
  const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
    if (e.key === 'Escape') {
      setInputTitle('')
    }
  }
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
    if (error !== null) {
      setError(null)
    }
  }

  return (
    <div>
      <input
        value={inputTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <Button title={'+'} onClick={addTaskHandler}/>
      {error && <div>{error}</div>}
    </div>
  );
};