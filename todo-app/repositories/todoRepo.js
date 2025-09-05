import { TODO_NOT_FOUND } from "../utils/errorMessages.js";
import { v4 as uuidv4 } from "uuid";

let todos = [];

export function list({ completed, q } = {}) {
  let result = todos;

  if (completed !== undefined) {
    result = result.filter(t => t.completed === (completed === "true"));
  }
  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(
      t =>
        t.title.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower)
    );
  }

  return result;
}

export function getById(id) {
  return todos.find(t => t.id === id);
}

export function listByUserId(userId) {
  return todos.filter(t => t.userId === userId);
}

export function create({ title, description, userId }) {
  const todo = { id: uuidv4(), title, description, completed: false, userId };
  todos.push(todo);
  return todo;
}

export function update(id, { title, description, completed, userId }) {
  const todo = getById(id);
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };

  todo.title = title;
  todo.description = description;
  todo.completed = completed;
  todo.userId = userId;

  return todo;
}

export function patch(id, data) {
  const todo = getById(id);
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };

  Object.assign(todo, data);
  return todo;
}

export function remove(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) throw { status: 404, message: TODO_NOT_FOUND };
  todos.splice(index, 1);
}
