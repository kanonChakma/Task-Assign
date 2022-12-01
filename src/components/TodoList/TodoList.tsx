import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { todo } from "../../common/model";
import ShowTodo from "../ShowTodo/ShowTodo";
import "./TodoList.css";

interface props {
  toDoData: todo[];
  completedTodo: todo[];
  progressTodo: todo[];
  setProgressTodo: React.Dispatch<React.SetStateAction<todo[]>>;
  setToDoData: React.Dispatch<React.SetStateAction<todo[]>>;
  setCompletedTodo: React.Dispatch<React.SetStateAction<todo[]>>;
}

const TodoList: React.FC<props> = ({
  progressTodo,
  setProgressTodo,
  toDoData,
  setToDoData,
  completedTodo,
  setCompletedTodo,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="activeTodos">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="todos__heading">Active Task</span>
            {toDoData.map((todo, index) => (
              <ShowTodo
                index={index}
                toDoData={toDoData}
                todos={todo}
                setToDoData={setToDoData}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="progressTodos">
        {(provided, snapshot) => (
          <div
            className={`todos progress ${
              snapshot.isDraggingOver ? "dragProcess" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="todos__heading">In Progress</span>
            {progressTodo.map((todo, index) => (
              <ShowTodo
                index={index}
                toDoData={progressTodo}
                todos={todo}
                setToDoData={setProgressTodo}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completedTodos">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="todos__heading">Compelted Task</span>
            {completedTodo.map((todo, index) => (
              <ShowTodo
                index={index}
                toDoData={completedTodo}
                todos={todo}
                setToDoData={setCompletedTodo}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
