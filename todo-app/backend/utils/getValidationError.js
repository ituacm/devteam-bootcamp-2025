import { VALIDATION_ERROR } from "./errorMessages.js";

export const getValidationError = (error) => {
  const parsedError = JSON.parse(error.message);

  return {
    error: VALIDATION_ERROR,
    message: parsedError[0].message,
    details: parsedError,
  };
};
