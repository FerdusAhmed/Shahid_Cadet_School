import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar remains fixed */}
            <aside className="w-72 bg-white border-r hidden lg:block">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
                <main className="p-8">
                    <Outlet /> {/* This is where Home.jsx or Login.jsx will appear */}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;