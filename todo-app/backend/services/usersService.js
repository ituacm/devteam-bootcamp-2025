import * as userRepo from "../repositories/userRepo.js";
import * as todoRepo from "../repositories/todoRepo.js";
import { USER_NOT_FOUND } from "../utils/errorMessages.js";

export async function create(data) {
  const existingUsername = await userRepo.findByUsername(data.username);
  if (existingUsername) {
    throw { status: 400, message: "Username already exists" };
  }

  const existingEmail = await userRepo.findByEmail(data.email);
  if (existingEmail) {
    throw { status: 400, message: "Email already exists" };
  }

  const userData = {
    username: data.username,
    email: data.email,
    password_hash: data.password,
  };

  return await userRepo.create(userData);
}

export async function list() {
  return await userRepo.list();
}

export async function getUserTodos(userId, query = {}) {
  const user = await userRepo.getById(userId);
  if (!user) throw { status: 404, message: USER_NOT_FOUND };
  return await todoRepo.listByUserId(userId, query);
}
