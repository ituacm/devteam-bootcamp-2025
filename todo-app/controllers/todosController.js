import * as todosService from "../services/todosService.js";

export function listTodos(req, res, next) {
  try {
    const todos = todosService.list(req.query);
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

export function getTodoById(req, res, next) {
  try {
    const todo = todosService.getById(req.params.id);
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

export function createTodo(req, res, next) {
  try {
    const todo = todosService.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

export function updateTodo(req, res, next) {
  try {
    const todo = todosService.update(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

export function patchTodo(req, res, next) {
  try {
    const todo = todosService.patch(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

export function deleteTodo(req, res, next) {
  try {
    todosService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export function completeTodo(req, res, next) {
  try {
    const todo = todosService.completeTodo(req.params.id);
    res.json(todo);
  } catch (err) {
    next(err);
  }
}