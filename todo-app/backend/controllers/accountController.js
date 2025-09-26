import * as usersService from "../services/usersService.js";

export async function getMe(req, res, next) {
  const user = await usersService.getUserById(req.user.id);
  res.send(user);
}

export async function authorize(req, res) {
  await usersService.sendAuthorizationToken(
    req.user.email,
    req.user.id,
    req.body.action
  );

  res.json(true);
}

export async function changePassword(req, res) {
  await usersService.updatePassword(req.user.id, req.body.password);
  res.json(true);
}

export async function changeEmail(req, res) {
  await usersService.updateEmail(req.user.id, req.body.email);

  res.json(true);
}
