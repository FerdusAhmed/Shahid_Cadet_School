import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import schoolLogo from "../../assets/logo.png";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
    const { user, logOut, role } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <nav className="bg-blue-50 border-b border-blue-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <img src={schoolLogo} alt="Shahid Cadet School" className="h-10 w-10" />
                    <span className="text-blue-600 font-black text-lg tracking-tighter hidden sm:inline">SCS</span>
                </Link>
                <div className="hidden md:flex gap-4 text-sm font-bold text-slate-600">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/admission" className="hover:text-blue-600 transition">Admission</Link>
                    <Link to="/teachers" className="hover:text-blue-600 transition">Teachers</Link>
                    <Link to="/noticeboard" className="hover:text-blue-600 transition">Notice Board</Link>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm font-medium text-slate-700">{user.email}</span>
                        {role === 'student' && (
                            <Link to="/students" className="text-xs font-bold text-blue-600 hover:text-blue-700 px-2 py-1 rounded">Dashboard</Link>
                        )}
                        {role === 'teacher' && (
                            <Link to="/teacher-panel" className="text-xs font-bold text-green-600 hover:text-green-700 px-2 py-1 rounded">Panel</Link>
                        )}
                        {role === 'admin' && (
                            <Link to="/admin" className="text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1 rounded">Admin</Link>
                        )}
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition active:scale-95">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100">
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;