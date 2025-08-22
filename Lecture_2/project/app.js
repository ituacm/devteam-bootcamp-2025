import express from "express";
import todosRouter from "./routers/todosRouter.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.use(express.json());

app.use("/todos", todosRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
