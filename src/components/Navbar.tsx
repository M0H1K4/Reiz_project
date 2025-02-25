// import React from 'react';
import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";
import logo from "../assets/LOGO.png";
import ThemeToggle from "../Pages/Toggler";
import { useTheme } from "../context/ThemeContext";
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          {/* <Tv size={24} /> */}
          <img src={logo} className="logonio" alt="" />
        </Link>
        {/* toggler */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/favorites" className="nav-link">
            <Heart size={20} />
          </Link>
          <Link to="/search" className="nav-link">
            <Search size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
