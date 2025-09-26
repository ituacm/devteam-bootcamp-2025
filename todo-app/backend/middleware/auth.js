import jwt from "jsonwebtoken";
import * as usersService from "../services/usersService.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function authRequired(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send({ message: "No token found." });

  const bearerPrefix = "Bearer ";
  if (!token.startsWith(bearerPrefix))
    return res.status(401).send({ message: "Invalid token format." });

  const actualToken = token.slice(bearerPrefix.length);

  try {
    const parsedToken = jwt.verify(actualToken, JWT_SECRET);

    req.user = parsedToken;

    next();
  } catch {
    res.status(400).send({ message: "Could not verify token" });
  }
}

// {
//  scope: ["change_email", "change_password", "delete_account"]
// }
export function permissionRequired(action) {
  return async (req, res, next) => {
    const permissionToken = req.query.token;

    if (!permissionToken)
      return res
        .status(403)
        .send({ message: "Could not find permission token." });

    try {
      const parsedPermissionToken =
        await usersService.verifyAndRevokeElevatedToken(
          permissionToken,
          req.user.id,
          action
        );
      next();
    } catch (e) {
      res
        .status(400)
        .send({ message: "Could not verify token", error: e.message });
    }
  };
}
