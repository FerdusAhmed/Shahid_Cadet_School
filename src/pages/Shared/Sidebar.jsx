import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Home, UserPlus, Users, LayoutDashboard, Settings, LogOut, ShieldCheck, MapPin } from "lucide-react";
import schoolLogo from "../../assets/logo.png";

const Sidebar = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogOut = () => {
        logOut()
            .then(() => navigate('/login'))
            .catch(err => console.error("Logout Failed:", err));
    };

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, icon: Icon, label }) => (
        <Link to={to} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
            isActive(to) ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "hover:bg-slate-800 text-slate-400 hover:text-white"
        }`}>
            <Icon size={18} />
            <span className="font-medium">{label}</span>
        </Link>
    );

    return (
        <div className="p-6 flex flex-col h-screen bg-slate-900 text-white border-r border-slate-800">
            <div className="mb-10 flex flex-col items-center">
                <img src={schoolLogo} alt="Shahid Cadet School" className="h-16 w-16 mb-3" />
                <h2 className="text-xl font-black text-blue-500 tracking-tighter text-center">Shahid Cadet School</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Sylhet, Bangladesh</p>
            </div>

            <div className="flex-grow space-y-8 overflow-y-auto">
                <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 ml-2">Main Menu</p>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/" icon={Home} label="Home" />
                        <NavLink to="/admission" icon={UserPlus} label="Admission Form" />
                        <NavLink to='/all-teachers' icon={Users} label='Teacher Directory' />
                        <NavLink to="/all-students" icon={Users} label="All Students" />
                        <NavLink to="/location" icon={MapPin} label="Location & Contact" />
                    </nav>
                </div>

                <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 ml-2">Portals</p>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/students" icon={LayoutDashboard} label="Student Panel" />
                        <NavLink to="/teacher-panel" icon={Settings} label="Teacher Panel" />
                        <NavLink to="/admin" icon={ShieldCheck} label="Admin Control" />
                    </nav>
                </div>
            </div>

            <button onClick={handleLogOut} className="mt-6 flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold">
                <LogOut size={18}/> Logout
            </button>
        </div>
    );
};

export default Sidebar;