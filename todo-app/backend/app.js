import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source.js";
import usersRouter from "./routes/usersRouter.js";
import todosRouter from "./routes/todosRouter.js";
import { notFoundHandler } from "./middleware/errors/notFoundHandler.js";
import { errorHandler } from "./middleware/errors/errorHandler.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
