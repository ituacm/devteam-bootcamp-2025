import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/querykeys";
import { apiGetTodos } from "../api/requests";
import { useSetError, useSetIsLoading, useSetTodos } from "../store/todoStore";

export const useTodosQuery = () => {
  const setTodos = useSetTodos();
  const setIsLoading = useSetIsLoading();
  const setError = useSetError();

  useQuery({
    queryKey: [queryKeys.todos],
    queryFn: async () => {
      setIsLoading(true);

      try {
        const todos = await apiGetTodos();
        localStorage.setItem("todos", JSON.stringify(todos));

        setTodos(todos);
      } catch {
        setError(error);
      } finally {
        setIsLoading(false);
      }

      return null;
    },
  });
};
