import { AppDataSource } from "../db/data-source.js";

export async function create(userId, action, expiresIn) {
  const elevatedTokenRepository = AppDataSource.getRepository("ElevatedToken");
  const elevatedToken = elevatedTokenRepository.create({
    userId: userId,
    action,
    expiresAt: new Date(Date.now() + expiresIn * 1000),
  });
  return await elevatedTokenRepository.save(elevatedToken);
}

export function findByToken(token) {
  const elevatedTokenRepository = AppDataSource.getRepository("ElevatedToken");
  return elevatedTokenRepository.findOne({ where: { token } });
}

export function patch(token, data) {
  const elevatedTokenRepository = AppDataSource.getRepository("ElevatedToken");
  const elevatedToken = elevatedTokenRepository.findOne({ where: { token } });

  if (!elevatedToken) throw { status: 404, message: "Token not found" };

  return elevatedTokenRepository.update({ token }, data);
}
