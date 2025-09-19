import "./App.css";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout.jsx";
import TodosPage from "./Pages/TodosPage/TodosPage.jsx";
import { todosLoader } from "./loaders/todosLoader.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/todos",
          element: <TodosPage />,
          loader: todosLoader,
        },
        {
          path: "/contact",
          element: <></>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
