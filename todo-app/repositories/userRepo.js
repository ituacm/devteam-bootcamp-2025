import { v4 as uuidv4 } from "uuid";

const users = [];

export function create({ username, email, password }) {
  const user = { id: uuidv4(), username, email, password };
  users.push(user);
  const { password: _, ...safeUser } = user;
  return safeUser;
}

export function list() {
  return users.map(({ password, ...u }) => u);
}

export function getById(id) {
  const user = users.find(u => u.id === id);
  if (!user) 
    return null;
  const {password: _, ...safeUser} = user;
  return safeUser;
}
