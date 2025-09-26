import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function authRequired(req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).send({ message: "No token found." });

  try {
    const parsedToken = jwt.verify(token, JWT_SECRET);

    req.user = parsedToken;

    next();
  } catch {
    res.status(400).send({ message: "Could not verify token" });
  }
}

// {
//  scope: ["change_email", "change_password", "delete_account"]
// }
export function permissionRequired(scope) {
  return (req, res, next) => {
    const permissionToken = req.body.token;

    if (!permissionToken)
      return res.status(403).send({ message: "Could not find permission token." });

    try {
      const parsedPermissionToken = jwt.verify(
        permissionToken, JWT_SECRET
      );

      if (parsedPermissionToken.scope.includes(scope)) {
        next();
      } else {
        return res.status(403).send({
          message: "Token does not include required scope: " + scope
        });
      }
    } catch {
      res.status(400).send({ message: "Could not verify token" });
    }
  };
}

