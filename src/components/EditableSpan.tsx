import {type ChangeEvent, useState} from "react";

type Props = {
  value:string
};
export const EditableSpan = ({value}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [input, setInput] =useState(value)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }
  const turnOfEditMode = () => {
    setIsEditMode(false)
  }
  const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  return (
    <>
      {isEditMode ? (
        <input
          value={input}
          autoFocus
          onBlur={turnOfEditMode}
          onChange={changeTitle}
        />
      ) : (
        <span
          onDoubleClick={turnOnEditMode}
        >{value}</span>
      )}
    </>
  );
};