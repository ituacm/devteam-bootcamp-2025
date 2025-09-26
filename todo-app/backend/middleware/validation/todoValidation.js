import { z } from "zod";
import { getValidationError } from "../../utils/getValidationError.js";

const createTodoSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});

const updateTodoSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  completed: z.boolean(),
});

const patchTodoSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    completed: z.boolean().optional(),
    userId: z.uuid("invalid userId format").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for PATCH",
  });

const todoIdParamSchema = z.object({
  id: z.uuid("invalid todo id format"),
});

const todosQuerySchema = z.object({
  completed: z.enum(["true", "false"]).optional(),
  q: z.string().optional(),
  page: z.string().regex(/^\d+$/, "page must be a number").optional(),
  limit: z.string().regex(/^\d+$/, "limit must be a number").optional(),
  sort: z.enum(["createdAt", "title", "updated_at"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export function validateTodoCreate(req, res, next) {
  try {
    createTodoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateTodoUpdate(req, res, next) {
  try {
    updateTodoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateTodoPatch(req, res, next) {
  try {
    patchTodoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateTodoIdParam(req, res, next) {
  try {
    todoIdParamSchema.parse(req.params);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateTodosQuery(req, res, next) {
  try {
    todosQuerySchema.parse(req.query);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}
