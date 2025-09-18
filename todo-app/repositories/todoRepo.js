import { AppDataSource } from "../db/data-source.js";
import { TODO_NOT_FOUND } from "../utils/errorMessages.js";

export async function list({
  completed,
  q,
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "desc",
} = {}) {
  const todoRepository = AppDataSource.getRepository("Todo");
  const queryBuilder = todoRepository.createQueryBuilder("todo");

  if (completed !== undefined) {
    queryBuilder.andWhere("todo.completed = :completed", {
      completed: completed === "true",
    });
  }

  if (q) {
    queryBuilder.andWhere(
      "(LOWER(todo.title) LIKE LOWER(:q) OR LOWER(todo.description) LIKE LOWER(:q))",
      { q: `%${q}%` }
    );
  }

  const validSortColumns = ["created_at", "updated_at", "title"];
  const sortColumn = validSortColumns.includes(sort) ? sort : "created_at";
  const sortOrder = order === "asc" ? "ASC" : "DESC";

  queryBuilder.orderBy(`todo.${sortColumn}`, sortOrder);

  if (page && limit) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    queryBuilder.skip((pageNum - 1) * limitNum).take(limitNum);
  }

  return await queryBuilder.getMany();
}

export async function getById(id) {
  const todoRepository = AppDataSource.getRepository("Todo");
  return await todoRepository.findOne({ where: { id } });
}

export async function listByUserId(
  userId,
  { completed, page = 1, limit = 10 } = {}
) {
  const todoRepository = AppDataSource.getRepository("Todo");
  const queryBuilder = todoRepository.createQueryBuilder("todo");

  queryBuilder.where("todo.user_id = :userId", { userId });

  if (completed !== undefined) {
    queryBuilder.andWhere("todo.completed = :completed", {
      completed: completed === "true",
    });
  }

  if (page && limit) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    queryBuilder.skip((pageNum - 1) * limitNum).take(limitNum);
  }

  queryBuilder.orderBy("todo.created_at", "DESC");

  return await queryBuilder.getMany();
}

export async function create({ title, description, user_id }) {
  const todoRepository = AppDataSource.getRepository("Todo");

  const todo = todoRepository.create({
    title,
    description,
    user_id,
    completed: false,
  });

  return await todoRepository.save(todo);
}

export async function update(id, { title, description, completed, user_id }) {
  const todoRepository = AppDataSource.getRepository("Todo");

  const todo = await todoRepository.findOne({ where: { id } });
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };

  todo.title = title;
  todo.description = description;
  todo.completed = completed;
  todo.user_id = user_id;
  todo.updated_at = new Date();

  return await todoRepository.save(todo);
}

export async function patch(id, data) {
  const todoRepository = AppDataSource.getRepository("Todo");

  const todo = await todoRepository.findOne({ where: { id } });
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };

  Object.assign(todo, data);
  todo.updated_at = new Date();

  return await todoRepository.save(todo);
}

export async function remove(id) {
  const todoRepository = AppDataSource.getRepository("Todo");

  const todo = await todoRepository.findOne({ where: { id } });
  if (!todo) throw { status: 404, message: TODO_NOT_FOUND };

  await todoRepository.remove(todo);
}
