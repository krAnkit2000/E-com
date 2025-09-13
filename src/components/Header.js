// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('You have logged out');
  };

  return (
    <header className="header"> 
      <div className="logo product-list">
        <Link to="/">E-commerce</Link>
      </div>

      <div className="nav">
        <Link to="/"><img
          src="https://cdn-icons-png.freepik.com/512/13012/13012364.png?ga=GA1.1.1808598779.1757661919" // home
          alt="Cart Icon"
          className=" Icon Home-icon"
        /></Link>
        <Link to="/cart">
        <img
          src="https://cdn-icons-png.freepik.com/512/891/891407.png?ga=GA1.1.1808598779.1757661919" // Cart icon image URL
          alt="Cart Icon"
          className=" Icon cart-icon"
        />
        </Link>




        {isLoggedIn ? (
          <div className="profile">
            <span><img
          src="https://cdn-icons-png.freepik.com/512/3385/3385324.png?ga=GA1.1.1808598779.1757661919" // profile
          alt="Cart Icon"
          className=" Icon profile-icon"
        />
</span>
            <button onClick={handleLogout} className="btn-logout">
                <img
          src=" https://cdn-icons-png.freepik.com/512/4034/4034229.png?ga=GA1.1.1808598779.1757661919" // Logout
          alt="Cart Icon"
          className=" Icon logout-icon"
        /></button>
          </div>
        ) : (
          <>
            <Link to="/login?mode=login" className="btn-login">Login</Link>
            <Link to="/login?mode=signup" className="btn-signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
