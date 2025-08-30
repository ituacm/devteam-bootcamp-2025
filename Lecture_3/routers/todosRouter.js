import express from "express";
import {
  getAllTodos,
  addTodo,
  validateTodo,
  addTodoWithMigration,
} from "../services/todoService.js";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", validateTodo, addTodo);
router.post("/migration", validateTodo, addTodoWithMigration);

export default router;
