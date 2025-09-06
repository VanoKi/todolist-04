import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
  onCreateItem: (item:string) => void
};
export const CreateItemForm = ({onCreateItem}: Props) => {
  const [item, setItem] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = (): void => {
    const trimmedItem = item.trim()
    if (trimmedItem !== '') {
      onCreateItem(trimmedItem)
      setItem('')
    } else {
      setError('Title is required')
    }
  }
  const keyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createItemHandler()
    }
    if (e.key === 'Escape') {
      setItem('')
    }
  }
  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItem(event.currentTarget.value)
    setError(null)
  }

  return (
    <div>
      <input value={item}
             onKeyDown={keyDownHandler}
             onChange={changeItemHandler}
             className={error ? 'error' : ''}
      />
      <Button title={'+'} onClick={createItemHandler}/>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};