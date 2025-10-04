// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('You have logged out');
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo product-list">
        <Link to="/">FashionHive</Link>
      </div>

      <div className="menu-wrapper">
        {/* Hamburger/Menu Button */}
        <button className="menu-btn" onClick={toggleMenu}>
         <img  className='menu-btn' src="https://cdn-icons-png.flaticon.com/512/17940/17940801.png" alt="menu" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="dropdown">
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/cart" onClick={toggleMenu}>Cart</Link>

            {isLoggedIn ? (
              <>
                <Link to="/orders" onClick={() => setMenuOpen(false)}>Your Orders</Link>
               
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login?mode=login" className="btn-login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/login?mode=signup" className="btn-signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
