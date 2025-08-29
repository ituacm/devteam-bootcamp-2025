import { todos } from "../db/Todos.js";

export const getAllTodos = (req, res) => {
  res.status(200).json(todos);
};

export const addTodo = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  todos.push({ title, description });
  res.status(201).json({ message: `${title} added successfully.` });
};

export const checkTodoFormat = (req, res, next) => {
  const { title, description } = req.body;
  if (typeof title !== "string" || typeof description !== "string") {
    return res.status(400).json({ message: "Invalid todo format" });
  }
  next();
};
