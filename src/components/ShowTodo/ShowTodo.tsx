import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { todo } from "../../common/model";
import "./ShowTodo.css";

interface props {
  index: number;
  todos: todo;
  toDoData: todo[];
  setToDoData: React.Dispatch<React.SetStateAction<todo[]>>;
}

const ShowTodo: React.FC<props> = ({ todos, toDoData, setToDoData, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<string>(todos.data);

  const handleDone = (id: number) => {
    setToDoData(
      toDoData.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setToDoData(toDoData.filter((todo) => todo.id !== id));
  };
  const handleSubmit = (e: React.FormEvent<EventTarget>, id: number) => {
    e.preventDefault();
    setToDoData(
      toDoData.map((todo) =>
        todo.id === id ? { ...todo, data: editData } : todo
      )
    );
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todos.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e, todos.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single--text"
              value={editData}
              onChange={(e) => setEditData(e.target.value)}
            />
          ) : todos.isDone ? (
            <s className="todos__single--text">
              {index + 1} {". "}
              {todos.data}
            </s>
          ) : (
            <span className="todos__single--text">
              {index + 1}
              {". "}
              {todos.data}
            </span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todos.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todos.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todos.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default ShowTodo;
