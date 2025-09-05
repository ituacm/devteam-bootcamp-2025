import * as usersService from "../services/usersService.js";

export function createUser(req, res, next) {
  try {
    const user = usersService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export function listUsers(req, res, next) {
  try {
    const users = usersService.list();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export function getUserTodos(req, res, next) {
  try {
    const todos = usersService.getUserTodos(req.params.id);
    res.json(todos);
  } catch (err) {
    next(err);
  }
}
