import e from "express";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validation/authValidation.js";
import { login, register } from "../controllers/authController.js";
import { controllerResponseHandler } from "../utils/handlers.js";
const r = e.Router();

r.post("/login", validateLogin, controllerResponseHandler(login));

r.post("/register", validateRegister, controllerResponseHandler(register));

export default r;
