import "./App.css";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout.jsx";
import TodosPage from "./Pages/TodosPage/TodosPage.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://cdf431218e874864f8a2fb3070a63204@o4510047800066048.ingest.de.sentry.io/4510047802687568",
});

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
        },
        {
          path: "/contact",
          element: <></>,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default Sentry.withSentryRouting(App);
