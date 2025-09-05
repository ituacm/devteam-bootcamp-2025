import * as usersService from "../services/usersService.js";

export function createUser(req, res, next) {
  const user = usersService.create(req.body);
  res.status(201).json(user);
}

export function listUsers(req, res, next) {
  const users = usersService.list();
  res.json(users);
}

export function getUserTodos(req, res, next) {
  const todos = usersService.getUserTodos(req.params.id);
  res.json(todos);
}
