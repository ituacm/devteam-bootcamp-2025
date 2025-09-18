import { Router } from "express";
import {
  listTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  completeTodo,
} from "../controllers/todosController.js";
import {
  validateTodoCreate,
  validateTodoUpdate,
  validateTodoPatch,
  validateTodoIdParam,
  validateTodosQuery,
} from "../middleware/validation/todoValidation.js";
import { controllerResponseHandler } from "../utils/handlers.js";

const router = Router();

router.get("/", validateTodosQuery, controllerResponseHandler(listTodos));
router.get("/:id", validateTodoIdParam, controllerResponseHandler(getTodoById));
router.post("/", validateTodoCreate, controllerResponseHandler(createTodo));
router.put(
  "/:id",
  validateTodoIdParam,
  validateTodoUpdate,
  controllerResponseHandler(updateTodo)
);
router.patch(
  "/:id",
  validateTodoIdParam,
  validateTodoPatch,
  controllerResponseHandler(patchTodo)
);
router.delete(
  "/:id",
  validateTodoIdParam,
  controllerResponseHandler(deleteTodo)
);
router.patch(
  "/:id/complete",
  validateTodoIdParam,
  controllerResponseHandler(completeTodo)
);

export default router;
