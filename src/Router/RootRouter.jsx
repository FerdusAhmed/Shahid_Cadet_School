import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import Notice from "../Pages/Notice/Notice";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";
import NexusLoader from "../components/Nexusloader/Nexusloader";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ViewNotice from "../Pages/Notice/ViewNotice";
import Attendance from "../Pages/Dashboard/Teacher/Attendance";
import AttendanceHistory from "../Pages/Dashboard/Teacher/AttendanceHistory";
import Assignment from "../Pages/TeacherPages/Assignment";
import MyAssignments from "../Pages/StudentPages/MyAssignments";
import ManageStudents from "../Pages/mangeStudent/ManageStudents";
import AdmissionForm from "../Pages/Admission/AdmissionForm";
import AdmissionApplication from "../Pages/AdminAdmissionCheck/AdmissionApplication";

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <NotFound></NotFound>,
    hydrateFallbackElement: <NexusLoader></NexusLoader>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/admission',
        Component: AdmissionForm,
      }
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: '/dashboard/noticepost',
        Component: Notice,
      },
      {
        path: '/dashboard/profile',
        Component: Profile,
      },
      {
      path:"/dashboard/manage-users",
      Component: ManageUsers
    },
    {
      path:"/dashboard/admissions",
      element: <AdmissionApplication></AdmissionApplication>
    },
    {
      path:"/dashboard/notices",
      Component: ViewNotice
    },
    {
      path:"/dashboard/teachersh/Attendance",
      element: <Attendance></Attendance>
    },{
      path:"/dashboard/teachersh/AttendanceHistory",
      element:<AttendanceHistory></AttendanceHistory>
    },
    {
      path:"/dashboard/assignments",
      Component: Assignment
    },
    {
      path:"/dashboard/my-assignments",
      Component: MyAssignments
      },
      {
        path: '/dashboard/manage-student',
        Component:ManageStudents
    }
    
    ],
  },
]);

export default router;
