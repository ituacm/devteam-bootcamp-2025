import React from "react";
import "./TodoCard.css";

function TodoCard({ id, title, description, completed }) {
  return (
    <div className="todo-card-container">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {completed ? "Completed" : "Pending"}</p>
    </div>
  );
}

export default TodoCard;
