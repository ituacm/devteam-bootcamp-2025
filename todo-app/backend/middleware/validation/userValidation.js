import { z } from "zod";
import { getValidationError } from "../../utils/getValidationError.js";

const createUserSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.email("invalid email format"),
  password: z.string().min(1, "password is required"),
});

const loginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

const requestedPermissionsSchema = z.object({
  scope: z.array(z.string())
});

const changeEmailSchema = z.object({
  email: z.email("invalid meail format"),
});

const changePasswordSchema = z.object({
  password: z.string().min(1, "a password is required"),
});

export function validateUserCreate(req, res, next) {
  try {
    createUserSchema.parse(req.body);
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

export function validateRequestedPermissions(req, res, next) {
  try {
    requestedPermissionsSchema.parse(req.body);
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
