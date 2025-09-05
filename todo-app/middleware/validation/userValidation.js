export function validateUserCreate(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "username, email and password are required"
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "invalid email format"
    });
  }

  next();
}
