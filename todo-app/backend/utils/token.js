import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function authenticationToken({ username, email, id }) {
  return jwt.sign({ id, email, username }, JWT_SECRET, { expiresIn: "1h" });
}

export function authorizationToken({ id, scope }) {
  return jwt.sign({ id, scope }, JWT_SECRET, { expiresIn: "10m" });
}
