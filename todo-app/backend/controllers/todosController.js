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
  const todo = await todosService.create({ ...req.body, userId: req.user.id });
  res.status(201).json(todo);
}

export async function updateTodo(req, res) {
  const todo = await todosService.getUsersTodoById(req.user.id, req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  const updatedTodo = await todosService.update(req.params.id, {
    ...req.body,
    userId: req.user.id,
  });
  res.json(updatedTodo);
}

export async function patchTodo(req, res) {
  const todo = await todosService.getUsersTodoById(req.user.id, req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  const updatedTodo = await todosService.patch(req.params.id, {
    ...req.body,
    userId: req.user.id,
  });
  res.json(updatedTodo);
}

export async function deleteTodo(req, res) {
  const todo = await todosService.getUsersTodoById(req.user.id, req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  await todosService.remove(req.params.id);
  res.status(204).send();
}

export async function completeTodo(req, res) {
  const todo = await todosService.getUsersTodoById(req.user.id, req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  const updatedTodo = await todosService.completeTodo(req.params.id);
  res.json(updatedTodo);
}

export async function listUsersTodos(req, res, next) {
  const todos = await todosService.listByUserId(req.user.id, req.query);
  res.json(todos);
}

export async function getUsersTodoById(req, res, next) {
  const todo = await todosService.getUsersTodoById(req.user.id, req.params.id);
  res.json(todo);
}
