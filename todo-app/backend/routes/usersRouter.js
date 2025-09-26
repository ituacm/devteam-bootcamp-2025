import { Router } from "express";
import {
  listUsers,
  createUser,
  login,
} from "../controllers/usersController.js";
import {
  validateLogin,
  validateUserCreate,
} from "../middleware/validation/userValidation.js";
import { controllerResponseHandler } from "../utils/handlers.js";

const router = Router();

router.post("/", validateUserCreate, controllerResponseHandler(createUser));
router.get("/", controllerResponseHandler(listUsers));
router.post("/login", validateLogin, controllerResponseHandler(login))

export default router;
