import { AppDataSource } from "../db/data-source.js";

export async function create({ username, email, password_hash }) {
  const userRepository = AppDataSource.getRepository("User");

  const user = userRepository.create({
    username,
    email,
    password_hash,
  });

  const savedUser = await userRepository.save(user);
  const { password_hash: _, ...safeUser } = savedUser;
  return safeUser;
}

export async function list() {
  const userRepository = AppDataSource.getRepository("User");
  const users = await userRepository.find();
  return users.map(({ password_hash, ...u }) => u);
}

export async function getById(id) {
  const userRepository = AppDataSource.getRepository("User");
  const user = await userRepository.findOne({ where: { id } });

  if (!user) return null;

  const { password_hash: _, ...safeUser } = user;
  return safeUser;
}

export async function findByUsername(username) {
  const userRepository = AppDataSource.getRepository("User");
  return await userRepository.findOne({ where: { username } });
}

export async function findByEmail(email) {
  const userRepository = AppDataSource.getRepository("User");
  return await userRepository.findOne({ where: { email } });
}
