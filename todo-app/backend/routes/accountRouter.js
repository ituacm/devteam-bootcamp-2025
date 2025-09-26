import { Router } from "express";
import {
  authorize,
  changePassword,
  changeEmail,
  getMe,
} from "../controllers/accountController.js";
import { authRequired, permissionRequired } from "../middleware/auth.js";
import { controllerResponseHandler } from "../utils/handlers.js";
import {
  validateChangeEmail,
  validateChangePassword,
  validateRequestedPermissions,
} from "../middleware/validation/accountValidation.js";

const router = Router();

router.use(authRequired);

router.get("/", controllerResponseHandler(getMe));

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
