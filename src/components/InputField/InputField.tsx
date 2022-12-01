import { useRef } from "react";
import "./InputField.css";

interface props {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleToDoData: (e: React.FormEvent<EventTarget>) => void;
}

const InputField: React.FC<props> = ({
  toDo,
  setToDo,
  handleToDoData,
}): any => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleToDoData(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
        placeholder="Enter a task"
        className="input__box"
      />
      <button type="submit" className="input_submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
