import { api } from "./config";

export const apiGetTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};
