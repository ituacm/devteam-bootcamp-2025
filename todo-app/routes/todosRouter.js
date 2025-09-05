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
import { controllerResponseHandler } from "../utils/handlers.js";

const router = Router();

router.get("/", controllerResponseHandler(listTodos));
router.get("/:id", controllerResponseHandler(getTodoById));
router.post("/", validateTodoCreate, controllerResponseHandler(createTodo));
router.put("/:id", validateTodoUpdate, controllerResponseHandler(updateTodo));
router.patch("/:id", validateTodoUpdate, controllerResponseHandler(patchTodo));
router.delete("/:id", controllerResponseHandler(deleteTodo));
router.patch("/:id/complete", controllerResponseHandler(completeTodo));

export default router;
