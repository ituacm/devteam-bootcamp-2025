const express = require("express");
const router = express.Router();

// POST /api/auth/login - Mock login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
      timestamp: new Date().toISOString(),
    });
  }

  // Mock authentication
  if (email === "admin@example.com" && password === "admin123") {
    return res.json({
      message: "Login successful",
      user: {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      },
      token: "mock-jwt-token-" + Date.now(),
      timestamp: new Date().toISOString(),
    });
  }

  res.status(401).json({
    error: "Invalid credentials",
    timestamp: new Date().toISOString(),
  });
});

// POST /api/auth/register - Mock register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Name, email and password are required",
      timestamp: new Date().toISOString(),
    });
  }

  // Mock registration
  const newUser = {
    id: Date.now(),
    name,
    email,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    message: "Registration successful",
    user: newUser,
    token: "mock-jwt-token-" + Date.now(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
