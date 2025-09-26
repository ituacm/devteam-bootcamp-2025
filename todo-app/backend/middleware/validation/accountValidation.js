import { z } from "zod";
import { getValidationError } from "../../utils/getValidationError.js";

const requestedPermissionsSchema = z.object({
  action: z.enum(["change_email", "change_password"], {
    errorMap: () => ({
      message: "action must be either 'change_email' or 'change_password'",
    }),
  }),
});

const changeEmailSchema = z.object({
  email: z.email("invalid email format"),
});

const changePasswordSchema = z.object({
  password: z.string().min(1, "a password is required"),
});

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
