import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Home, UserPlus, Users, LogOut, Megaphone } from "lucide-react";
import schoolLogo from "../../assets/logo.png";
import studentIcon from "../../assets/student-icon.svg";
import teacherIcon from "../../assets/teacher-icon.svg";
import adminIcon from "../../assets/admin-icon.svg";

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

    const NavLink = ({ to, icon: Icon, image, label }) => (
        <Link to={to} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
            isActive(to) ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "hover:bg-blue-800 text-blue-100 hover:text-white"
        }`}>
            {image ? <img src={image} alt={label} className="w-5 h-5" /> : <Icon size={18} />}
            <span className="font-medium">{label}</span>
        </Link>
    );

    return (
        <div className="p-6 flex flex-col h-screen bg-blue-900 text-white border-r border-blue-800">
            <div className="mb-10 flex flex-col items-center">
                <img src={schoolLogo} alt="Shahid Cadet School" className="h-16 w-16 mb-3" />
                <h2 className="text-xl font-black text-blue-300 tracking-tighter text-center">SCS</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Sylhet Bangladesh</p>
            </div>

            <div className="grow space-y-8 overflow-y-auto">
                <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 ml-2">Main Menu</p>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/" icon={Home} label="Home" />
                        <NavLink to="/admission" icon={UserPlus} label="Admission" />
                        <NavLink to="/teachers" icon={Users} label="Teachers" />
                        <NavLink to="/noticeboard" icon={Megaphone} label="Notices" />
                    </nav>
                </div>

                <div>
                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-4 ml-2">Portals</p>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/students" image={studentIcon} label="Student" />
                        <NavLink to="/teacher-panel" image={teacherIcon} label="Teacher" />
                        <NavLink to="/admin" image={adminIcon} label="Admin" />
                    </nav>
                </div>
            </div>

            <button onClick={handleLogOut} className="mt-6 flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold w-full">
                <LogOut size={18}/> Logout
            </button>
        </div>
    );
};

export default Sidebar;