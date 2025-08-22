import express from "express";
import {
  getAllTodos,
  addTodo,
  checkTodoFormat,
} from "../services/todoService.js";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", checkTodoFormat, addTodo);

export default router;
