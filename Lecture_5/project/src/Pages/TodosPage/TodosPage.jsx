import React from "react";
import "./TodosPage.css";
import TodoList from "../../Components/TodoList/TodoList";
import { useState } from "react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function TodosPage() {
  const todos = useLoaderData();
  return (
    <div className="todos-page-container">
      <div className="todos-page-content">
        <h1>Your Todos:</h1>
        <p>
          You can see your todos here. Stay organized by keeping track of your
          tasks. Add, edit, or remove todos as you need.
        </p>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default TodosPage;
