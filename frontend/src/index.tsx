import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { HowItWorks } from "./pages/HowItWorksPage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      { element: <HomePage />, index: true },
      {
        element: <HowItWorks />,
        path: "how.html",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

// TODO: errorElement: <NotFound />;
