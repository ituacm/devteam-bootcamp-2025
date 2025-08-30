import * as z from "zod";
import { AppDataSource } from "../db/data-source.js";
import { TodosSchema } from "../schema/Todos.schema.js";

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

export const addTodoWithMigration = async (req, res) => {
  await todoRepo.manager.transaction(async (entityManager) => {
    const todo = entityManager.create(TodosSchema, req.body);

    // Save first todo
    await entityManager.save(TodosSchema, todo);

    // Make another copy
    const copyTodo = entityManager.create(TodosSchema, {
      title: todo.title + " (Copy)",
      description: todo.description + " (Copy)",
    });
    await entityManager.save(TodosSchema, copyTodo);
  });

  res.status(201).json({ message: `Todos added successfully.` });
};

export const validateTodo = (req, res, next) => {
  const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const result = todoSchema.safeParse(req.body);

  if (!result.success) {
    const error = JSON.parse(result.error.message);

    return res.status(400).json({ message: error });
  }

  next();
};
