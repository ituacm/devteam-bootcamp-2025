import React from "react";
import "./TodoList.css";
import TodoCard from "../TodoCard/TodoCard";
import { useState } from "react";

function TodoList({ todos }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="todo-list-container">
        <div className="todo-list">
          {todos.slice(0, showMore ? todos.length : 6).map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
            />
          ))}
        </div>
        <button
          className="todo-list-show-more-button"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
}

export default TodoList;
