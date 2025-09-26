import { Router } from "express";
import {
  authorize,
  changePassword,
  changeEmail,
  getUserTodos,
} from "../controllers/usersController.js";
import {
  authRequired,
  permissionRequired
} from "../middleware/auth.js";
import { controllerResponseHandler } from "../utils/handlers.js";
import {
  validateChangeEmail,
  validateChangePassword,
  validateRequestedPermissions
} from "../middleware/validation/userValidation.js";

const router = Router();

router.use(authRequired)

router.get("/todos", controllerResponseHandler(getUserTodos));
router.post(
  "/2fa",
  validateRequestedPermissions,
  controllerResponseHandler(authorize)
);

router.post(
  "/change_email",
  permissionRequired("change_email"),
  validateChangeEmail,
  controllerResponseHandler(changeEmail)
);

router.post(
  "/change_password",
  permissionRequired("change_password"),
  validateChangePassword,
  controllerResponseHandler(changePassword)
);

export default router;
