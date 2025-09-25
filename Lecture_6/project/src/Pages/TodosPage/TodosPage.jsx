import React from "react";
import "./TodosPage.css";
import TodoList from "../../Components/TodoList/TodoList";
import { useTodosQuery } from "../../queries";
import { useError, useIsLoading, useTodos } from "../../store/todoStore";

function TodosPage() {
  useTodosQuery();
  const todos = useTodos();
  const isLoading = useIsLoading();
  const error = useError();

  if (error) {
    return <div>Error: {error.response?.data?.message}</div>;
  }

  return (
    <div className="todos-page-container">
      <div className="todos-page-content">
        <h1>Your Todos:</h1>
        <p>
          You can see your todos here. Stay organized by keeping track of your
          tasks. Add, edit, or remove todos as you need.
        </p>
        <TodoList todos={todos} />
        <button
          onClick={() => {
            throw new Error("Test error");
          }}
        >
          Test error
        </button>
      </div>
    </div>
  );
}

export default TodosPage;
