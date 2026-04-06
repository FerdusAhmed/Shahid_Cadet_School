import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';


const ThemeToggle = () => {
     const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
     useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
     }, [theme]);
    
    const toggleTheme = () => {
    const newTheme = theme === "light" ? "nexusdark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    };
    
    return (
        <div>
            <button
                      onClick={toggleTheme}
                      className="btn btn-ghost btn-circle text-lg transition-transform duration-300 hover:rotate-180"
                    >
                      {theme === "light" ? <FaMoon /> : <FaSun />}
                    </button>
            
        </div>
    );
};

export default ThemeToggle;