import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdmissionForm from "../pages/Student/AdmissionForm";
import StudentDashboard from "../pages/Student/StudentDashboard";
import TeacherForm from "../pages/Teacher/TeacherForm";
import TeacherPanel from "../pages/Teacher/TeacherPanel"; // added for sidebar
import AdminPanel from "../pages/Admin/AdminPanel";
import ErrorPage from "../pages/ErrorPage"; // display routing errors
import LocationAndContact from "../pages/LocationAndContact"; // new contact page
import AllStudents from "../pages/AllStudents"; // new student management page
import AllTeachers from "../pages/AllTeachers"; // new teacher directory page
// RequireAuth removed since login is just a placeholder

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // The layout must have <Outlet /> inside it
    errorElement: <ErrorPage />, // catch rendering/loader errors
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "admission", element: <AdmissionForm /> },
      { path: "teachers", element: <TeacherForm /> },
      { path: "all-teachers", element: <AllTeachers /> }, // new teacher directory page
      // also support the teacher-panel url used by the sidebar
      { path: "teacher-panel", element: <TeacherPanel /> },

      // portal routes (navbar buttons)
      { path: "students", element: <StudentDashboard /> }, 
      { path: "admin", element: <AdminPanel /> },
      { path: "all-students", element: <AllStudents /> }, // new class-wise student page
      { path: "location", element: <LocationAndContact /> }, // new location/contact page

      // Sidebar paths (kept in case other components use them)
      { path: "student-panel", element: <StudentDashboard /> },
      { path: "admin-panel", element: <AdminPanel /> },
      // legacy name (optional)
      { path: "admin-control", element: <AdminPanel /> },

      // wildcard fallback (should render ErrorPage with not found message)
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);