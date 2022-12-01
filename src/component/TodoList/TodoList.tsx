import React from "react";
import { Todo } from "../../utils";
import SingleTodo from "../SingleTodo/SingleTodo";
import "./TodoList.css";

interface props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<props> = ({ todos, setTodos }: props) => {
  return (
    <div className="container">
      {todos?.map((todo, index) => (
        <SingleTodo
          index={index}
          todos={todos}
          todo={todo}
          key={todo.id}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
