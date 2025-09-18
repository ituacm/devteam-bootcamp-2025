import { Router } from "express";
import {
  listUsers,
  getUserTodos,
  createUser,
} from "../controllers/usersController.js";
import {
  validateUserCreate,
  validateUserIdParam,
} from "../middleware/validation/userValidation.js";
import { controllerResponseHandler } from "../utils/handlers.js";

const router = Router();

router.post("/", validateUserCreate, controllerResponseHandler(createUser));
router.get("/", controllerResponseHandler(listUsers));
router.get(
  "/:id/todos",
  validateUserIdParam,
  controllerResponseHandler(getUserTodos)
);

export default router;
