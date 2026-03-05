import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Sidebar from "../pages/Shared/Sidebar";
import Footer from "../pages/Shared/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <aside className="w-64 hidden lg:block">
                    <Sidebar />
                </aside>
                <main className="flex-1 bg-gray-50">
                    <Outlet /> {/* CRITICAL: This renders the Student/Admin pages */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;