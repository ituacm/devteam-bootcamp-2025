import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import TodosPage from "./Pages/TodosPage/TodosPage";
import { todosLoader } from "./loaders/todosLoader";

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
          path: "/about",
          element: <div>About Page</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
