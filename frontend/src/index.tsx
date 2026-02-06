import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { HowItWorksPage } from "./pages/HowItWorksPage.tsx";
import "./index.css";
import { AboutPage } from "./pages/AboutPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      { element: <HomePage />, index: true },
      {
        element: <HowItWorksPage />,
        path: "how.html",
      },
      {
        element: <AboutPage />,
        path: "about.html",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

// TODO: errorElement: <NotFound />;
