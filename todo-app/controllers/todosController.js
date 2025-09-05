import * as todosService from "../services/todosService.js";

export function listTodos(req, res, next) {
  const todos = todosService.list(req.query);
  res.json(todos);
}

export function getTodoById(req, res, next) {
  const todo = todosService.getById(req.params.id);
  res.json(todo);
}

export function createTodo(req, res, next) {
  const todo = todosService.create(req.body);
  res.status(201).json(todo);
}

export function updateTodo(req, res, next) {
  const todo = todosService.update(req.params.id, req.body);
  res.json(todo);
}

export function patchTodo(req, res, next) {
  const todo = todosService.patch(req.params.id, req.body);
  res.json(todo);
}

export function deleteTodo(req, res, next) {
  todosService.remove(req.params.id);
  res.status(204).send();
}

export function completeTodo(req, res, next) {
  const todo = todosService.completeTodo(req.params.id);
  res.json(todo);
}