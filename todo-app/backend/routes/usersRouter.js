import { Router } from "express";
import { listUsers } from "../controllers/usersController.js";
import {
  validateLogin,
  validateUserCreate,
} from "../middleware/validation/userValidation.js";
import { controllerResponseHandler } from "../utils/handlers.js";

const router = Router();

router.get("/", controllerResponseHandler(listUsers));

export default router;
