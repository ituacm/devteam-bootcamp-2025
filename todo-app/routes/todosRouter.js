import { Router } from "express";
import {
  listTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo
} from "../controllers/todosController.js";
import { validateTodoCreate, validateTodoUpdate } from "../middleware/validation/todoValidation.js";
import { completeTodo } from "../controllers/todosController.js";

const router = Router();

router.get("/", listTodos);
router.get("/:id", getTodoById);
router.post("/", validateTodoCreate, createTodo);
router.put("/:id", validateTodoUpdate, updateTodo);
router.patch("/:id", validateTodoUpdate, patchTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/complete", completeTodo);

export default router;
