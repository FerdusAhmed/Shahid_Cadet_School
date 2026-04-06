import React, { useContext, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import logoimg from '../../assets/logo.png'
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserCircle,
  UserPen,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// all nav bar link
const links = (
  <>
    <li>
      <Link to={"/"}>Home</Link>
    </li>
    <li>
      <Link to={"/about"}>About</Link>
    </li>
    <li>
      <Link to={"/contact"}>Contact</Link>
    </li>
  </>
);

const Navbar = () => {
  const { logOut, user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // responsive nav
  const [activeRes, setActiveRes] = useState(false);
  

  // logout function
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.info("success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <header className="top-0 border-b/10 shadow py-4 sticky bg-white z-50 ">
    <header
      className="top-0 border-b border-base-300 shadow h-20 flex items-center w-full sticky 
    bg-base-100 z-50 transition-colors duration-300"
    >
      {/* containar */}
      <div className="flex w-full items-center justify-between max-w-7xl px-4 md:px-6 mx-auto">
        {/* mobile menu */}
        <Menu onClick={()=> setActiveRes(!activeRes)} className="md:hidden"/>

        {/* logo */}
        
        <Link to="/" className="font-bold text-2xl flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl overflow-hidden shadow-sm border border-white">
          <img className="w-full h-full object-cover" src={logoimg} alt="Logo" />
        </div>
          Nexus-<span className="text-primary">School</span>
        </Link>

       {/* Mobile Menu */}
<nav 
  className={`md:hidden fixed inset-0 z-[100] transition-all duration-300 ${
    activeRes ? "visible opacity-100" : "invisible opacity-0"
  }`}
>
  {/* Backdrop/Overlay */}
  <div 
    onClick={() => setActiveRes(false)} 
    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
  />

  {/* Sidebar Content */}
  <div 
    className={`absolute top-0 left-0 w-[75%] max-w-[300px] h-full bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
      activeRes ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    {/* Sidebar Header with Logo */}
    <div className="p-6 flex items-center justify-between border-b border-slate-50 bg-slate-50/50">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl overflow-hidden shadow-sm border border-white">
          <img className="w-full h-full object-cover" src={logoimg} alt="Logo" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Nexus School
        </span>
      </div>
      
      <button 
        onClick={() => setActiveRes(false)} 
        className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <X size={20} />
      </button>
    </div>

    {/* Navigation Links */}
    <div className="flex-grow overflow-y-auto p-6">
      <ul 
        onClick={() => setActiveRes(false)} 
        className="flex flex-col gap-4"
      >
       
        {links}
      </ul>
    </div>

    {/* Bottom Section */}
    <div className="p-6 border-t border-slate-50 bg-slate-50/30">
      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">Quick Access</p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
             <UserCircle size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-700 leading-none">{user?.displayName || "Guest"}</span>
            <span className="text-[11px] text-slate-400">Student Account</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

        {/* desktop nav */}
        <nav className=" hidden md:block">
          <ul className="flex gap-5 ">{links}</ul>
        </nav>

        {/* if login */}
        {isLoading ? (
          <>
            <div className="flex items-center gap-4">
              {/* Profile Shimmer */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 py-1.5 pl-1.5 pr-4 rounded-full overflow-hidden relative">
                {/* Avatar Circle */}
                <div className="w-9 h-9 rounded-full bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                </div>
                {/* Name Strip */}
                <div className="hidden md:inline h-4 w-20 bg-slate-200 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </>
        ) : user ? (
          <div className="flex items-center gap-5">
            {/* user info */}

            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="dropdown flex items-center justify-center md:gap-3 bg-white/80 backdrop-blur-md md:border border-slate-200 py-1.5 pl-1.5 pr-1.5 md:pr-4 rounded-full md:shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                popoverTarget="popover-1"
                style={
                  { anchorName: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                {/* User Image Container */}
                <div className="relative">
                  <img
                    className="w-9 h-9 rounded-full border-5 border-indigo-500/20 group-hover:border-indigo-500 transition-colors object-cover"
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    referrerPolicy="no-referrer"
                    alt="User Profile"
                  />
                  {/* Active Status Dot (Optional) */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* User Name */}
                <span className="hidden md:inline text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors truncate max-w-[120px]">
                  {user?.displayName || "Guest User"}
                </span>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-white/95 backdrop-blur-lg rounded-2xl z-50 w-60 p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 mt-2 space-y-1"
              >
                {/* Header Section (Optional but Professional) */}
                <li className="px-4 py-2 mb-1 border-b border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Account Menu
                  </p>
                </li>

                {/* Dashboard Link */}
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group"
                  >
                    <LayoutDashboard
                      size={18}
                      className="text-slate-400 group-hover:text-indigo-600"
                    />
                    <span className="font-medium text-sm">Dashboard</span>
                  </Link>
                </li>

                {/* Profile Link */}
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group"
                  >
                    <UserCircle
                      size={18}
                      className="text-slate-400 group-hover:text-indigo-600"
                    />
                    <span className="font-medium text-sm">View Profile</span>
                  </Link>
                </li>

                {/* Divider */}
                <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>

                {/* Logout Button */}
                <li className="pt-1">
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 group active:scale-95 shadow-sm hover:shadow-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                      />
                      <span className="font-semibold text-sm">Log Out</span>
                    </div>
                    {/* Small arrow indicator */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* dashboard */}
            <Link
              to="/login"
              className=" cursor-pointer relative inline-flex items-center px-6 py-2.5 font-medium md:text-slate-700 bg-primary text-white md:bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group transition-all duration-300 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-95"
            >
              {/* Hover Background Layer */}
              <span className="absolute inset-0 w-0 bg-indigo-50 transition-all duration-300 ease-out group-hover:w-full"></span>

              {/* Text Content */}
              <span className="relative flex items-center gap-2">
                Login
                <LogIn
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-3"
                />
              </span>
            </Link>

            <Link
              to="/register"
              className="hidden cursor-pointer relative md:inline-flex items-center px-6 py-2.5 font-medium bg-primary text-white border border-slate-200 rounded-xl overflow-hidden group transition-all duration-300 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-95"
            >
              {/* Hover Background Layer */}
              <span className="absolute inset-0 w-0 bg-indigo-50 transition-all duration-300 ease-out group-hover:w-full"></span>

              {/* Text Content */}
              <span className="relative flex items-center gap-2">
                Register
                <UserPen
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-3"
                />
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

{
  /* logiout */
}
