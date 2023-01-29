import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { todo } from "../../common/model";
import InputField from "../InputField/InputField";
import Sidebar from "../Sidebar/Sidebar";
import TodoList from "../TodoList/TodoList";
import "./Home.css";

const Home: React.FC = () => {
  const [toDo, setTodo] = useState<string>("");
  const [toDoData, setToDoData] = useState<todo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<todo[]>([]);
  const [progressTodo, setProgressTodo] = useState<todo[]>([]);

  const handleToDoData = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (toDo) {
      setToDoData([...toDoData, { id: Date.now(), isDone: false, data: toDo }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = toDoData,
      complete = completedTodo,
      progress = progressTodo;

    if (source.droppableId === "activeTodos") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "progressTodos") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      add.isDone = false;
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "activeTodos") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "progressTodos") {
      progress.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
    }

    setProgressTodo(progress);
    setCompletedTodo(complete);
    setToDoData(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="Home">
        <h5 className="heading">Task Assign</h5>
        <div className="home">
          <div className="leftbar">
            <Sidebar />
          </div>
          <div className="rightbar">
            <InputField
              toDo={toDo}
              setToDo={setTodo}
              handleToDoData={handleToDoData}
            />

            <TodoList
              completedTodo={completedTodo}
              toDoData={toDoData}
              setCompletedTodo={setCompletedTodo}
              setToDoData={setToDoData}
              progressTodo={progressTodo}
              setProgressTodo={setProgressTodo}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Home;
