const express = require("express");
const router = express.Router();

// Mock user data
const users = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    role: "admin",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Fatma Demir",
    email: "fatma@example.com",
    role: "user",
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    role: "user",
    createdAt: "2024-01-17T09:15:00Z",
  },
];

// GET /api/users - Tüm kullanıcıları getir
router.get("/", (req, res) => {
  const { role, limit } = req.query;

  let filteredUsers = users;

  if (role) {
    filteredUsers = users.filter((user) => user.role === role);
  }

  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit));
  }

  // Sensitive bilgileri çıkar
  const safeUsers = filteredUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }));

  res.json({
    users: safeUsers,
    count: safeUsers.length,
    total: users.length,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/users/:id - Tek kullanıcı getir
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
      id: id,
      timestamp: new Date().toISOString(),
    });
  }

  // Sensitive bilgileri çıkar
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  res.json({
    user: safeUser,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
