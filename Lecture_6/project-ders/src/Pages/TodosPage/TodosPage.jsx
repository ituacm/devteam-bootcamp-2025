import React, { useEffect, useState } from "react";
import "./TodosPage.css";
import TodosList from "../../Components/TodosList/TodosList";
import { useLoaderData } from "react-router-dom";

function TodosPage() {
  const [todos, setTodos] = useState(useLoaderData());

  return (
    <div className="todos-page-container">
      <div className="todos-page-content">
        <h1 className="todos-page-header">Your Todos:</h1>
        <p className="todos-page-description">
          This is where your todo list will be displayed.
        </p>
        <TodosList todos={todos} />
      </div>
    </div>
  );
}

export default TodosPage;
