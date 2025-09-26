import * as userRepo from "../repositories/userRepo.js";
import * as todoRepo from "../repositories/todoRepo.js";
import { USER_NOT_FOUND } from "../utils/errorMessages.js";
import { authenticationToken, authorizationToken } from "../utils/token.js";
import { sendMail } from "./mailService.js";

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
  return await todoRepo.listByUserId(userId, query);
}

export async function updatePassword(userId, password) {
  await userRepo.updatePassword(userId, password);
}

export async function updateEmail(userId, email) {
  await userRepo.updateEmail(userId, email);
}

export async function login(username, password) {
  const user = await userRepo.verifyCredentials(username, password);
  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = authenticationToken(user);

  return { token, user };
}

export async function sendAuthorizationToken(email, userId, scope) {
  await sendMail(
    email,
    `Doğrulama Tokenınınz (${scope.join(", ")})`,
    authorizationToken({
      id: userId,
      scope
    })
  )
}
