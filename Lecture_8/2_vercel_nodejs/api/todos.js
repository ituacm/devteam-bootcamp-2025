const express = require("express");
const router = express.Router();

// In-memory storage (production'da database kullanın)
let todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Deploy to Vercel",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Build awesome apps",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

// GET /api/todos - Tüm todoları getir
router.get("/", (req, res) => {
  const { completed, limit } = req.query;

  let filteredTodos = todos;

  if (completed !== undefined) {
    filteredTodos = todos.filter(
      (todo) => todo.completed === (completed === "true")
    );
  }

  if (limit) {
    filteredTodos = filteredTodos.slice(0, parseInt(limit));
  }

  res.json({
    todos: filteredTodos,
    count: filteredTodos.length,
    total: todos.length,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/todos/:id - Tek todo getir
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found",
      id: id,
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    todo,
    timestamp: new Date().toISOString(),
  });
});

// POST /api/todos - Yeni todo oluştur
router.post("/", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
      timestamp: new Date().toISOString(),
    });
  }

  const newTodo = {
    id: Math.max(...todos.map((t) => t.id), 0) + 1,
    title: title.trim(),
    completed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo created successfully",
    todo: newTodo,
    timestamp: new Date().toISOString(),
  });
});

// PUT /api/todos/:id - Todo güncelle
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      error: "Todo not found",
      id: id,
      timestamp: new Date().toISOString(),
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Title cannot be empty",
        timestamp: new Date().toISOString(),
      });
    }
    todos[todoIndex].title = title.trim();
  }

  if (completed !== undefined) {
    todos[todoIndex].completed = Boolean(completed);
  }

  todos[todoIndex].updatedAt = new Date().toISOString();

  res.json({
    message: "Todo updated successfully",
    todo: todos[todoIndex],
    timestamp: new Date().toISOString(),
  });
});

// DELETE /api/todos/:id - Todo sil
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      error: "Todo not found",
      id: id,
      timestamp: new Date().toISOString(),
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  res.json({
    message: "Todo deleted successfully",
    todo: deletedTodo,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
