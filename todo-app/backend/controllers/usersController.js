import * as usersService from "../services/usersService.js";

export async function listUsers(req, res) {
  const users = await usersService.list();
  res.json(users);
}

export async function getUserTodos(req, res) {
  const todos = await usersService.getUserTodos(req.user.id, req.query);
  res.json(todos);
}
