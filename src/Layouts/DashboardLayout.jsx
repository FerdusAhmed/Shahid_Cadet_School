import { useContext, useState } from "react";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import {
    LayoutDashboard, Users, BookOpen, FileText,
    Bell, LogOut, Menu, X, UserCircle, GraduationCap,
    ClipboardList
} from "lucide-react";
import { FcManager } from 'react-icons/fc';
import { AuthContext } from "../AuthContext/AuthContext";
import NS1_logo from "../assets/NS1.png";
import useRole from "../Hooks/useRole";
import NexusLoader from "../components/Nexusloader/Nexusloader";
import { PiStudentFill } from 'react-icons/pi';

const NavLinks = ({
    isOpen,
    isMobile = false,
    userRole,
    setMobileMenuOpen,
}) => (
    <ul className="space-y-2">
        <SidebarLink
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isOpen={isOpen}
            end={true}
            onClick={() => isMobile && setMobileMenuOpen(false)}
        />

        {userRole === 'admin' && (
            <>
                <SidebarLink
                    to="/dashboard/manage-users"
                    icon={<Users size={20} />}
                    label="Manage Users"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/noticepost"
                    icon={<Bell size={20} />}
                    label="Post Notice"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/admissions"
                    icon={<ClipboardList size={20} />}
                    label="Admission Apps"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
            </>
        )}

        {userRole === 'teacher' && (
            <>
                <SidebarLink
                    to="/dashboard/my-classes"
                    icon={<BookOpen size={20} />}
                    label="My Classes"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/teachersh/Attendance"
                    icon={<BookOpen size={20} />}
                    label="Attendance"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/teachersh/AttendanceHistory"
                    icon={<BookOpen size={20} />}
                    label="Attendance-History"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/assignments"
                    icon={<FileText size={20} />}
                    label="Assignments"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/notices"
                    icon={<Bell size={20} />}
                    label="Notice Board"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/manage-student"
                    icon={<PiStudentFill size={20} />}
                    label="ManageStudent"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
            </>
        )}

        {userRole === 'student' && (
            <>
                <SidebarLink
                    to="/dashboard/my-courses"
                    icon={<GraduationCap size={20} />}
                    label="My Courses"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/my-results"
                    icon={<FileText size={20} />}
                    label="Exam Results"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/my-assignments"
                    icon={<FileText size={20} />}
                    label="My Assignments"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
                <SidebarLink
                    to="/dashboard/notices"
                    icon={<Bell size={20} />}
                    label="Notice Board"
                    isOpen={isOpen}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                />
            </>
        )}

        <div
            className={`my-4 border-t border-slate-700/50 ${isOpen ? 'pt-4' : 'pt-2'}`}
        >
            <SidebarLink
                to="/dashboard/profile"
                icon={<UserCircle size={20} />}
                label="My Profile"
                isOpen={isOpen}
                onClick={() => isMobile && setMobileMenuOpen(false)}
            />
        </div>
    </ul>
);

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userRole, roleLoading] = useRole();


    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (roleLoading) {
        return (
            <NexusLoader></NexusLoader>
        );
    }

    const userName = user?.displayName || "Nexus User";
    const userImg = user?.photoURL || "https://i.pravatar.cc/150?img=11";
    // const userRole = "admin";

    return (
        <div className="min-h-screen flex bg-[#0F172A] text-[#E2E8F0] font-sans selection:bg-blue-500/30">

            {/* --- MOBILE SIDEBAR (Drawer) --- */}
            <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                <aside className={`absolute left-0 top-0 h-full w-72 bg-[#1E293B] p-6 transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-3">
                            <img src={NS1_logo} alt="Logo" className="h-10 w-10 rounded-full" />
                            <span className="font-bold text-white tracking-tight">NEXUS-SCHOOL</span>
                        </div>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-800 rounded-lg text-slate-400">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        <NavLinks isOpen={true} isMobile={true} userRole={userRole} setMobileMenuOpen={setMobileMenuOpen} />
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-700">
                        <Link to="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-2xl group active:scale-95 transition-all">
                            <img referrerPolicy="no-referrer" src={userImg} alt="profile" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />
                            <div className="truncate">
                                <p className="text-sm font-bold truncate text-white">{userName}</p>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{userRole}</p>
                            </div>
                        </Link>
                    </div>
                </aside>
            </div>

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-30'} bg-[#1E293B] p-6 hidden md:flex flex-col border-r border-slate-700 shadow-2xl transition-all duration-300 h-screen sticky top-0`}>
                <div className="mb-10 flex items-center gap-3 overflow-hidden">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={NS1_logo}
                            alt="Logo"
                            className="h-10 w-10 rounded-full shrink-0 shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform"
                        />
                        {isSidebarOpen && (
                            <span className="text-xl font-bold text-white whitespace-nowrap">
                                NEXUS-<span className="text-blue-500">SCHOOL</span>
                            </span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto custom-scrollbar">
                    <NavLinks isOpen={isSidebarOpen} userRole={userRole} />
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-700">
                    <Link to="/dashboard/profile" className="flex items-center gap-3 p-2 hover:bg-slate-800 transition-colors rounded-2xl overflow-hidden group">
                        <img referrerPolicy="no-referrer" src={userImg} alt="profile" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shrink-0 group-hover:border-white transition-all" />
                        {isSidebarOpen && (
                            <div className="truncate">
                                <p className="text-sm font-bold truncate group-hover:text-white">{userName}</p>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{userRole}</p>
                            </div>
                        )}
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-20 bg-[#1E293B]/80 backdrop-blur-md flex justify-between items-center px-6 md:px-8 border-b border-slate-700 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-slate-800 rounded-lg md:hidden text-slate-400">
                            <Menu size={24} />
                        </button>
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg hidden md:block text-slate-400">
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h1 className="text-sm md:text-lg font-medium text-slate-300">System <span className="text-white font-bold">Portal</span></h1>
                    </div>

                    <button onClick={handleLogout} className="px-3 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-xs md:text-sm flex items-center gap-2">
                        <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                    </button>
                </header>

                <main className="p-4 md:p-10 w-full max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// SidebarLink helper stays outside as well
const SidebarLink = ({ to, icon, label, isOpen, end = false, onClick }) => (
    <li>
        <NavLink to={to} end={end} onClick={onClick}
            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all group ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <div className={`shrink-0 ${!isOpen && 'mx-auto'}`}>{icon}</div>
            {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
        </NavLink>
    </li>
);

export default DashboardLayout;