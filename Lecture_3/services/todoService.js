import { AppDataSource } from "../db/data-source.js";

const todoRepo = AppDataSource.getRepository("Todos");

export const getAllTodos = async (req, res) => {
  const todos = await todoRepo.find();

  res.status(200).json(todos);
};

export const addTodo = async (req, res) => {
  const todo = todoRepo.create(req.body);
  await todoRepo.save(todo);
  res.status(201).json({ message: `${todo.title} added successfully.` });
};

export const checkTodoFormat = (req, res, next) => {
  const { title, description } = req.body;

  if (typeof title !== "string" || typeof description !== "string") {
    return res.status(400).json({ message: "Invalid todo format" });
  }
  next();
};
