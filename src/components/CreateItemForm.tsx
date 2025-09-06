import {Button} from "./Button.tsx";
import {useState} from "react";

type Props = {
  onClick: () => void
};
export const CreateItemForm = ({onClick}: Props) => {
  const [value, setValue] = useState('')

  return (
    <div className={'container'}>
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button title={'x'} onClick={() => onClick()}/>
    </div>
  );
};