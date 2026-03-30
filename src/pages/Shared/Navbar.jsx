import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
    }`}>
      
      {/* --- TOP MINI BAR (Formal Info) --- */}
      <div className="hidden md:block bg-blue-900 text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center space-x-6">
            <span>📞 +880 1234-567890</span>
            <span>✉️ info@shahidcadet.edu.bd</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="opacity-80">EIIN: 123456</span>
            <span className="bg-blue-700 px-2 py-0.5 rounded italic">Discipline • Education • Morality</span>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-blue-50 p-1.5 rounded-xl group-hover:rotate-6 transition-transform">
            <img src={Logo} alt="Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-blue-900 leading-none tracking-tighter">
              SCA Portal
            </span>
            
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {[
            { name: "Home", path: "/" },
            { name: "Teachers", path: "/teachers" },
            { name: "Admission", path: "/admission" },
            { name: "Notice Board", path: "/notice" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                isActive(link.path) 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-[1px] bg-gray-200 mx-4"></div>

          <Link
            to="/admin"
            className="bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            Admin Portal
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-lg bg-gray-100 text-blue-900"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY MENU --- */}
      <div className={`md:hidden absolute w-full bg-white border-t transition-all duration-300 shadow-xl overflow-hidden ${
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="flex flex-col p-6 space-y-4">
          <Link onClick={() => setIsOpen(false)} to="/" className="text-lg font-bold text-gray-800 border-b pb-2">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/teachers" className="text-lg font-bold text-gray-800 border-b pb-2">Teachers</Link>
          <Link onClick={() => setIsOpen(false)} to="/admission" className="text-lg font-bold text-gray-800 border-b pb-2">Admission</Link>
          <Link onClick={() => setIsOpen(false)} to="/notice" className="text-lg font-bold text-gray-800 border-b pb-2">Notice Board</Link>
          <Link 
            onClick={() => setIsOpen(false)} 
            to="/admin" 
            className="bg-blue-900 text-white p-4 rounded-xl text-center font-bold"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;