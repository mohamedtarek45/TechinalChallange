import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layout/layout";
import LeadPage from "./pages/LeadPage";
export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/lead", element: <LeadPage /> },
        { path: "/lead/:id", element: <LeadPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return <RouterProvider router={router} />;
}
