import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Admission from "../pages/Admission";
import AdminPanel from "../pages/Admin/AdminPanel";
import Teachers from "../pages/Teachers"; // Import the new page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "teachers", element: <Teachers /> }, // New Route
      { path: "admission", element: <Admission /> },
      { path: "admin", element: <AdminPanel /> },
      {path: "notice", element: <div className="p-8 text-center text-2xl">Notice Board Coming Soon!</div>},
      {path: "contact", element: <div className="p-8 text-center text-2xl">Contact Page Coming Soon!</div>}
    ],
  },
]);