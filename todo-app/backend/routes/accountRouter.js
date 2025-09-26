import { Router } from "express";
import {
  getUserTodos,
} from "../controllers/usersController.js";
import {
  authRequired
} from "../middleware/auth.js";
import { controllerResponseHandler } from "../utils/handlers.js";

const router = Router();

router.use(authRequired)

router.get(
  "/todos",
  controllerResponseHandler(getUserTodos)
);

export default router;
