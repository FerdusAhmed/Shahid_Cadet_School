import React from 'react';
import useRole from "../../Hooks/useRole";
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import StudentDashboard from '../DashboardHomepage/StudentDashboard';
import AdminDashboard from '../DashboardHomepage/AdminDashboard';
import TeacherDashboard from '../DashboardHomepage/TeacherDashboard';


const Dashboard = () => {
    const [role, roleLoading] = useRole();

    if (roleLoading) {
        return (
            <NexusLoader />
        );
    }
   
    // role based rendering
    if (role === 'admin') return <AdminDashboard />;
    if (role === 'teacher') return <TeacherDashboard />;
  
    return <StudentDashboard />;
};

export default Dashboard;