const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "ITU ACM DevTeam Bootcamp - ngrok Demo",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

// Webhook endpoint for testing
app.post("/api/webhook", (req, res) => {
  console.log("🎣 Webhook received:", {
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  res.json({
    message: "Webhook received successfully",
    received_data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// User data endpoint
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com" },
    { id: 2, name: "Fatma Demir", email: "fatma@example.com" },
    { id: 3, name: "Mehmet Kaya", email: "mehmet@example.com" },
  ];

  res.json({
    users,
    count: users.length,
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/users`);
  console.log(`   POST http://localhost:${PORT}/api/webhook`);
});

