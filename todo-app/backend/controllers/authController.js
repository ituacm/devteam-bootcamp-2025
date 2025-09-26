import * as usersService from "../services/usersService.js";

export async function register(req, res, next) {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
}

export async function login(req, res) {
  const { token, user } = await usersService.login(
    req.body.username,
    req.body.password
  );

  res.json({ token, user });
}
