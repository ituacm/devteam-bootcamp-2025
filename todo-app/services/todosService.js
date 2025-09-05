import * as todoRepo from "../repositories/todoRepo.js";
import * as userRepo from "../repositories/userRepo.js";
import { TODO_NOT_FOUND, INVALID_USER_ID, TODO_ALREADY_COMPLETED } from "../utils/errorMessages.js";

export function list(query) {
  return todoRepo.list(query);
}

export function getById(id) {
  const todo = todoRepo.getById(id);
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };
  return todo;
}

export function create(data) {
  const user = userRepo.getById(data.userId);
  if (!user) throw { status: 400, message: INVALID_USER_ID };
  return todoRepo.create(data);
}

export function update(id, data) {
  return todoRepo.update(id, data);
}

export function patch(id, data) {
  return todoRepo.patch(id, data);
}

export function remove(id) {
  return todoRepo.remove(id);
}

export function completeTodo(id) {
  const todo = todoRepo.getById(id);
  if(!todo) throw { status: 404, message: TODO_NOT_FOUND };
  if(todo.completed) throw { status: 400, message: TODO_ALREADY_COMPLETED };
  todoRepo.patch(id, { completed: true });
  return todo;
}