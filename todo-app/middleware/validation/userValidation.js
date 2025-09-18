import { z } from "zod";
import { getValidationError } from "../../utils/getValidationError.js";

const createUserSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.email("invalid email format"),
  password: z.string().min(1, "password is required"),
});

const userIdParamSchema = z.object({
  id: z.uuid("invalid user id format"),
});

export function validateUserCreate(req, res, next) {
  try {
    createUserSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateUserIdParam(req, res, next) {
  try {
    userIdParamSchema.parse(req.params);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}
