
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import './LoginSignup.css';

// const LoginSignup = ({ setIsLoggedIn, setUsername }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsernameInput] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
  

//   const [searchParams] = useSearchParams();
//   const mode = searchParams.get('mode');

//   useEffect(() => {
//     if (mode === 'signup') {
//       setIsLogin(false); 
//     } else {
//       setIsLogin(true);
//     }
//   }, [mode]);

//   const getUsers = () => {
//     const users = localStorage.getItem('users');
//     return users ? JSON.parse(users) : [];
//   };

//   const saveUsers = (users) => {
//     localStorage.setItem('users', JSON.stringify(users));
//   };

//   const handleLogin = () => {
//     const users = getUsers();
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//       setIsLoggedIn(true);
//       setUsername(username);
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('username', username);
//       alert('Login Successful! ✅️');

//       // Check if the user came from the cart page
//       const fromCart = sessionStorage.getItem('fromCart');
//       if (fromCart === 'true') {
//         sessionStorage.removeItem('fromCart');
//         navigate('/cart'); // Redirect to the cart if the user was there
//       } else {
//         navigate('/');  // Redirect to the delivery page
//       }
//     } else {
//       alert('Invalid username or password ❌');
//     }
//   };

//   const handleSignup = () => {
//     const users = getUsers();
//     const userExists = users.some(u => u.username === username);
//     if (userExists) {
//       alert('Username already exists');
//       return;
//     }
//     users.push({ username, password });
//     saveUsers(users);
//     alert('Signup Successful! Please login now. ✅️');
//     setIsLogin(true);
//     setUsernameInput('');
//     setPassword('');
//     navigate('/login?mode=login'); 
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       handleLogin();
//     } else {
//       handleSignup();
//     }
//   };

//   return (
//     <div className="login-signup-container">
//       <form className="login-signup-form" onSubmit={handleSubmit}>
//         <h2>{isLogin ? 'Login 👨🏻‍💻' : 'Sign Up 🔐'}</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={e => setUsernameInput(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="btn-submit">
//           {isLogin ? 'Login' : 'Sign Up'}
//         </button>

//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//           <span
//             onClick={() => {
//               setIsLogin(!isLogin);
//               navigate(isLogin ? '/login?mode=signup' : '/login?mode=login');
//             }}
//             className="toggle-link"
//           >
//             {isLogin ? 'Sign Up' : 'Login'}
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginSignup;
// src/pages/LoginSignup.js
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./LoginSignup.css";

const LoginSignup = ({ setIsLoggedIn, setUsername }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // new state
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    setIsLogin(mode !== "signup");
  }, [mode]);

  // 🔹 Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful ✅");
      setIsLoggedIn(true);
      setUsername(email);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", email);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Email/Password Signup with Confirm Password
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match ❌");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful ✅ Now you can login.");
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setConfirmPassword(""); // clear confirm password
      navigate("/login?mode=login");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Forgot password
  const handleForgotPassword = async () => {
    if (!email) return alert("Enter your registered email first");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) handleLogin();
    else handleSignup();
  };

  return (
    <div className="login-signup-container">
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login 👨🏻‍💻" : "Sign Up 🔐"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password only in signup */}
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <button type="submit" className="btn-submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {isLogin && (
          <p
            onClick={handleForgotPassword}
            style={{ color: "#007bff", cursor: "pointer", marginTop: "10px" }}
          >
            Forgot Password?
          </p>
        )}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              navigate(isLogin ? "/login?mode=signup" : "/login?mode=login");
            }}
            className="toggle-link"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
