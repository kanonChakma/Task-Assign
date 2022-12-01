import React, { useState } from "react";
import { Todo } from "../../utils";
import InputField from "../Input/InputField";
import TodoList from "../TodoList/TodoList";
import "./Home.css";

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), isDone: false, todo }]);
      setTodo("");
    }
  };

  return (
    <div className="home">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        CompletedTodos={CompletedTodos}
        setCompletedTodos={setCompletedTodos}
      />
    </div>
  );
};

export default Home;
