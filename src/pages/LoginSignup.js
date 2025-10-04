// src/pages/LoginSignup.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = ({ setIsLoggedIn, setUsername }) => {
  const [isLogin, setIsLogin] = useState(true); // default to Login form
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Read the query parameter to determine if it's a login or signup
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (mode === 'signup') {
      setIsLogin(false); // If mode is signup, switch to signup form
    } else {
      setIsLogin(true); // Else show login form
    }
  }, [mode]);

  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setUsername(username);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      alert('Login Successful! ✅️');

      // Check if the user came from the cart page
      const fromCart = sessionStorage.getItem('fromCart');
      if (fromCart === 'true') {
        sessionStorage.removeItem('fromCart');
        navigate('/cart'); // Redirect to the cart if the user was there
      } else {
        navigate('/');  // Redirect to the delivery page
      }
    } else {
      alert('Invalid username or password ❌');
    }
  };

  const handleSignup = () => {
    const users = getUsers();
    const userExists = users.some(u => u.username === username);
    if (userExists) {
      alert('Username already exists');
      return;
    }
    users.push({ username, password });
    saveUsers(users);
    alert('Signup Successful! Please login now. ✅️');
    setIsLogin(true);
    setUsernameInput('');
    setPassword('');
    navigate('/login?mode=login'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="login-signup-container">
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login 👨🏻‍💻' : 'Sign Up 🔐'}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsernameInput(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              navigate(isLogin ? '/login?mode=signup' : '/login?mode=login');
            }}
            className="toggle-link"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
