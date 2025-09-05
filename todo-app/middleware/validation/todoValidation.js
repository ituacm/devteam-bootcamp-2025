export function validateTodoCreate(req, res, next) {
  const { title, description, userId } = req.body;

  if (!title || !description || !userId) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "title, description and userId are required"
    });
  }

  next();
}

export function validateTodoUpdate(req, res, next) {
  const { method, body } = req;
  const {title, description, completed, userId} = body;

  if (method === "PUT") {
    if (!title || !description || completed === undefined || !userId) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "All fields (title, description, completed, userId) required for PUT"
      });
    }
  }
  if (method === "PATCH") {
    if (!title && !description && completed === undefined && !userId) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "At least one field (title, description, completed, userId) required for PATCH"
      });
    }
  }

  next();
}
