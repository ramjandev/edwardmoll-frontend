import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Realtors from "@/pages/Realtors";
import ServicesPage from "@/pages/ServicesPage";
import Gallery from "@/pages/Gallery";
import Updates from "@/pages/Updates";
import PostDetail from "@/pages/PostDetail";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Admin Imports
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import ServicesManager from "@/pages/admin/ServicesManager";
import GalleryManager from "@/pages/admin/GalleryManager";
import PostsManager from "@/pages/admin/PostsManager";
import InquiriesManager from "@/pages/admin/InquiriesManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <ServicesPage /> },
      { path: "gallery", element: <Gallery /> },
      { path: "updates", element: <Updates /> },
      { path: "updates/:slug", element: <PostDetail /> },
      { path: "realtors", element: <Realtors /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "quote", element: <Navigate to="/contact" replace /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "services", element: <ServicesManager /> },
      { path: "gallery", element: <GalleryManager /> },
      { path: "posts", element: <PostsManager /> },
      { path: "inquiries", element: <InquiriesManager /> },
    ],
  },
]);

export default router;
