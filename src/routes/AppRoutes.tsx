import App from "@/App";

import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import QuoteWizard from "@/pages/QuoteWizard";
import Realtors from "@/pages/Realtors";
import ServicesPage from "@/pages/ServicesPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "quote",
        element: <QuoteWizard />,
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
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
