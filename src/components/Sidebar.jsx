import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, BookOpen, ClipboardCheck, Megaphone, LogOut } from "lucide-react";

const Sidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/attendance", label: "Attendance", icon: <ClipboardCheck size={20} /> },
        { path: "/student-history", label: "Academic Records", icon: <BookOpen size={20} /> },
        { path: "/admin", label: "Admin Control", icon: <UserCheck size={20} /> },
    ];

    return (
        <div className="h-full flex flex-col bg-white border-r border-slate-100 p-4">
            <div className="mb-10 px-4">
                <h1 className="text-2xl font-black text-blue-600 tracking-tighter">SCSC</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shahid Cadet School</p>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                            location.pathname === item.path 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="pt-4 border-t border-slate-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 font-bold hover:bg-red-50 rounded-xl transition">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;