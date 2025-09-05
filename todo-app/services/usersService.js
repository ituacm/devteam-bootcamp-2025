import * as userRepo from "../repositories/userRepo.js";
import * as todoRepo from "../repositories/todoRepo.js";

export function create(data) {
  return userRepo.create(data);
}

export function list() {
  return userRepo.list();
}

export function getUserTodos(userId) {
  const user = userRepo.getById(userId);
  if (!user) throw { status: 404, message: "User not found" };
  return todoRepo.listByUserId(userId);
}
