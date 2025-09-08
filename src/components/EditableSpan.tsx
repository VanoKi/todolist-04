import {type ChangeEvent, useState} from "react";

type Props = {
  title: string
  onChangeInput: (newTitle:string) => void
};
export const EditableSpan = ({title, onChangeInput}: Props) => {
  const [isEdit, setEdit] = useState<boolean>(false)
  const [input, setInput] = useState(title)

  const turnOn = () => {
    setEdit(true)
  }
  const turnOff = () => {
    setEdit(false)
    onChangeInput(input)
  }

  return (
    <>
      {isEdit ? (
        <input
          value={input}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value) }
          autoFocus
          onBlur={turnOff}
        />
      ) : (
        <span onDoubleClick={turnOn}>{title}</span>
      )}
    </>
  );
};