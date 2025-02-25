// import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Search, Heart } from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <Tv size={24} />
          <span>TV Shows</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
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

export default Navbar