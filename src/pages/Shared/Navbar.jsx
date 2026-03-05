import { Link } from "react-router-dom";
import schoolLogo from "../../assets/logo.png";

const Navbar = () => {
    return (
        <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <img src={schoolLogo} alt="Shahid Cadet School" className="h-10 w-10" />
                    <span className="text-blue-600 font-black text-lg tracking-tighter hidden sm:inline">Shahid Cadet School</span>
                </Link>
                <div className="hidden md:flex gap-4 text-sm font-bold text-slate-600">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/admission" className="hover:text-blue-600 transition">Admission</Link>
                    <Link to="/all-students" className="hover:text-blue-600 transition">Students</Link>
                    <Link to="/students" className="hover:text-blue-600 transition">Dashboard</Link>
                    <Link to='/all-teachers' className='hover:text-blue-600 transition'>Teachers</Link>
                    <Link to="/admin" className="hover:text-blue-600 transition text-red-500">Admin</Link>
                    <Link to="/location" className="hover:text-blue-600 transition">Contact</Link>
                </div>
            </div>
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100">
                Login
            </Link>
        </nav>
    );
};

export default Navbar;