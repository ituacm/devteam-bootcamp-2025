export function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "ENDPOINT_NOT_FOUND" });
}

