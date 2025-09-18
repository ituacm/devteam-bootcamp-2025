import * as todosService from "../services/todosService.js";

export async function listTodos(req, res) {
  const todos = await todosService.list(req.query);
  res.json(todos);
}

export async function getTodoById(req, res) {
  const todo = await todosService.getById(req.params.id);
  res.json(todo);
}

export async function createTodo(req, res) {
  const todo = await todosService.create(req.body);
  res.status(201).json(todo);
}

export async function updateTodo(req, res) {
  const todo = await todosService.update(req.params.id, req.body);
  res.json(todo);
}

export async function patchTodo(req, res) {
  const todo = await todosService.patch(req.params.id, req.body);
  res.json(todo);
}

export async function deleteTodo(req, res) {
  await todosService.remove(req.params.id);
  res.status(204).send();
}

export async function completeTodo(req, res) {
  const todo = await todosService.completeTodo(req.params.id);
  res.json(todo);
}
