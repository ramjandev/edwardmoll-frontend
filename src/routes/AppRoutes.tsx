import App from "@/App";

import AdminLayout from "@/layout/AdminLayout";
import Home from "@/pages/Home";
import QuoteWizard from "@/pages/QuoteWizard";
import About from "@/pages/About";
import ServicesPage from "@/pages/ServicesPage";
import Realtors from "@/pages/Realtors";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // public routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "quote",
        element: <QuoteWizard />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "realtors",
        element: <Realtors />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },

      // protected routes
      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [{ index: true, element: <AdminDashboard /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
