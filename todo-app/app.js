import express from 'express';
import usersRouter from './routes/usersRouter.js';
import todosRouter from './routes/todosRouter.js';
import { notFoundHandler } from './middleware/errors/notFoundHandler.js';
import { errorHandler } from './middleware/errors/errorHandler.js';

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;