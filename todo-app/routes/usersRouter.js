import { Router } from "express";
import {
  listUsers,
  getUserTodos,
  createUser
} from "../controllers/usersController.js";
import { validateUserCreate } from "../middleware/validation/userValidation.js";

const router = Router();

router.post("/", validateUserCreate, createUser);
router.get("/", listUsers);
router.get("/:id/todos", getUserTodos);

export default router;
