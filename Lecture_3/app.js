import express from "express";
import todosRouter from "./routers/todosRouter.js";
import { AppDataSource } from "./db/data-source.js";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.get("/", (req, res) => {
      res.send("Hello World.");
    });

    app.use("/todos", todosRouter);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("DB connection error:", err));
