import * as usersService from "../services/usersService.js";

export async function createUser(req, res) {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
}

export async function listUsers(req, res) {
  const users = await usersService.list();
  res.json(users);
}

export async function getUserTodos(req, res) {
  const todos = await usersService.getUserTodos(req.params.id, req.query);
  res.json(todos);
}
