import * as userRepo from "../repositories/userRepo.js";
import * as todoRepo from "../repositories/todoRepo.js";
import * as tokenRepo from "../repositories/elevatedTokenRepo.js";
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

export async function sendAuthorizationToken(email, userId, action) {
  const token = await tokenRepo.create(userId, action, 3600);
  await sendMail(email, `Doğrulama Tokenınınz (${action})`, token.token);
}

export async function getUserById(userId) {
  const user = await userRepo.getById(userId);
  if (!user) throw { status: 404, message: USER_NOT_FOUND };
  return user;
}

export async function verifyAndRevokeElevatedToken(token, userId) {
  const storedToken = await tokenRepo.findByToken(token);
  if (!storedToken) throw { status: 404, message: "Invalid token" };
  if (storedToken.userId !== userId) {
    await tokenRepo.patch(token, { used: true });
    throw { status: 403, message: "Token does not belong to the user" };
  }
  if (storedToken.used) {
    throw { status: 403, message: "Already used" };
  }
  if (storedToken.expiresAt < new Date()) {
    throw { status: 403, message: "Token expired" };
  }

  return await tokenRepo.patch(token, { used: true });
}
