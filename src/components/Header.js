// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('You have logged out');
    navigate('/'); // logout ke baad home page pe bhejna
  };

  return (
    <header className="header"> 
      {/* Logo */}
      <div className="logo product-list">
        <Link to="/">FashionHive</Link> 
      </div>

      {/* Navigation Section */}
      <div className="nav">
        {/* Home */}
        <Link to="/">
          <img
            src="https://cdn-icons-png.freepik.com/512/13012/13012364.png"
            alt="Home"
            className="Icon home-icon"
          />
        </Link>

        {/* Cart */}
        <Link to="/cart">
          <img
            src="https://cdn-icons-png.freepik.com/512/891/891407.png"
            alt="Cart"
            className="Icon cart-icon"
          />
        </Link>

        {/* Auth Section */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn-logout">
            <img
              src="https://cdn-icons-png.freepik.com/512/4034/4034229.png"
              alt="Logout"
              className="Icon logout-icon"
            />
        
          </button>
        ) : (
          <div className="auth-buttons">
            <Link to="/login?mode=login" className="btn-login">Login</Link>
            <Link to="/login?mode=signup" className="btn-signup">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
