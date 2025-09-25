import { create } from "zustand";

const getInitialTodos = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch {
    return [];
  }
};

export const useTodoStore = create((set) => ({
  todos: getInitialTodos(),
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTodos: (todos) => set({ todos }),
}));

export const useTodos = () => useTodoStore((state) => state.todos);
export const useSetTodos = () => useTodoStore((state) => state.setTodos);
export const useIsLoading = () => useTodoStore((state) => state.isLoading);
export const useError = () => useTodoStore((state) => state.error);
export const useSetIsLoading = () =>
  useTodoStore((state) => state.setIsLoading);
export const useSetError = () => useTodoStore((state) => state.setError);
