const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration for production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com", "https://vercel-frontend-url.vercel.app"]
      : ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚀 ITU ACM DevTeam Bootcamp - Vercel Node.js Demo",
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Students API
const students = [
  { id: 1, name: "Ahmet Yılmaz", department: "Computer Engineering", year: 3 },
  { id: 2, name: "Fatma Demir", department: "Software Engineering", year: 2 },
  { id: 3, name: "Mehmet Kaya", department: "Computer Engineering", year: 4 },
  { id: 4, name: "Ayşe Şahin", department: "Data Science", year: 1 },
];

app.get("/api/students", (req, res) => {
  const { department, year } = req.query;

  let filteredStudents = students;

  if (department) {
    filteredStudents = filteredStudents.filter((student) =>
      student.department.toLowerCase().includes(department.toLowerCase())
    );
  }

  if (year) {
    filteredStudents = filteredStudents.filter(
      (student) => student.year === parseInt(year)
    );
  }

  res.json({
    students: filteredStudents,
    total: filteredStudents.length,
    filters: { department, year },
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
      id,
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    student,
    timestamp: new Date().toISOString(),
  });
});

// Projects API
app.get("/api/projects", (req, res) => {
  const projects = [
    {
      id: 1,
      name: "Todo App",
      description: "Full-stack todo application with React and Node.js",
      tech_stack: ["React", "Node.js", "MongoDB"],
      status: "completed",
    },
    {
      id: 2,
      name: "E-commerce Platform",
      description: "Online shopping platform with payment integration",
      tech_stack: ["Next.js", "Express", "PostgreSQL", "Stripe"],
      status: "in_progress",
    },
    {
      id: 3,
      name: "Chat Application",
      description: "Real-time chat app with WebSocket",
      tech_stack: ["Vue.js", "Socket.io", "Redis"],
      status: "planning",
    },
  ];

  res.json({
    projects,
    count: projects.length,
    timestamp: new Date().toISOString(),
  });
});

// Contact form endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "email", "message"],
      timestamp: new Date().toISOString(),
    });
  }

  // Email validation (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
      timestamp: new Date().toISOString(),
    });
  }

  // Simulate processing
  console.log("📧 Contact form received:", { name, email, message });

  res.status(201).json({
    message: "Contact form submitted successfully",
    id: Date.now(), // Simple ID generation
    data: { name, email },
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🚨 Error:", err);

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    available_routes: [
      "GET /",
      "GET /api/health",
      "GET /api/students",
      "GET /api/students/:id",
      "GET /api/projects",
      "POST /api/contact",
    ],
    timestamp: new Date().toISOString(),
  });
});

// Start server (only in development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📋 Available endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/`);
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log(`   GET  http://localhost:${PORT}/api/students`);
    console.log(`   GET  http://localhost:${PORT}/api/students/:id`);
    console.log(`   GET  http://localhost:${PORT}/api/projects`);
    console.log(`   POST http://localhost:${PORT}/api/contact`);
  });
}

// Export for Vercel
module.exports = app;
