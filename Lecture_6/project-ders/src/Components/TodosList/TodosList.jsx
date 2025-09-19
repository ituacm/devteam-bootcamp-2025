import React, { useState } from "react";
import "./TodosList.css";
import TodoCard from "../TodoCard/TodoCard";

function TodosList({ todos }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="todos-list-container">
      <div className="todos-list">
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
        className="todos-list-show-more-button"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default TodosList;
