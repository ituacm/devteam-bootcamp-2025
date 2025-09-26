import * as todoRepo from "../repositories/todoRepo.js";
import * as userRepo from "../repositories/userRepo.js";
import {
  TODO_NOT_FOUND,
  INVALID_USER_ID,
  TODO_ALREADY_COMPLETED,
} from "../utils/errorMessages.js";

export async function list(query) {
  return await todoRepo.list(query);
}

export async function getById(id) {
  const todo = await todoRepo.getById(id);
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };
  return todo;
}

export async function create(data) {
  const todoData = {
    title: data.title,
    description: data.description,
    user_id: data.userId,
  };

  return await todoRepo.create(todoData);
}

export async function update(id, data) {
  const updateData = {
    title: data.title,
    description: data.description,
    completed: data.completed,
    user_id: data.userId,
  };

  return await todoRepo.update(id, updateData);
}

export async function patch(id, data) {
  const todo = await todosService.getUsersTodoById(req.user.id, req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return await todoRepo.patch(id, data);
}

export async function remove(id) {
  return await todoRepo.remove(id);
}

export async function completeTodo(id) {
  const todo = await todoRepo.getById(id);
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };
  if (todo.completed) throw { status: 400, message: TODO_ALREADY_COMPLETED };

  const updatedTodo = await todoRepo.patch(id, { completed: true });
  return updatedTodo;
}

export async function listByUserId(userId, query = {}) {
  const user = await userRepo.getById(userId);
  if (!user) throw { status: 404, message: INVALID_USER_ID };

  return await todoRepo.listByUserId(userId, query);
}

export async function getUsersTodoById(userId, todoId) {
  const user = await userRepo.getById(userId);
  if (!user) throw { status: 404, message: INVALID_USER_ID };

  const todo = await todoRepo.getById(todoId);
  if (!todo || todo.user_id !== userId)
    throw { status: 404, message: TODO_NOT_FOUND };
  return todo;
}
