import { z } from "zod";
import { getValidationError } from "../../utils/getValidationError.js";

const registerSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().email("invalid email format"),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

const loginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

const changeEmailSchema = z.object({
  email: z.string().email("invalid email format"),
});

const changePasswordSchema = z.object({
  password: z.string().min(6, "password must be at least 6 characters long"),
});

export function validateRegister(req, res, next) {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateLogin(req, res, next) {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateChangeEmail(req, res, next) {
  try {
    changeEmailSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}

export function validateChangePassword(req, res, next) {
  try {
    changePasswordSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(getValidationError(error));
  }
}
