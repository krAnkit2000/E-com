
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
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./LoginSignup.css";

const LoginSignup = ({ setIsLoggedIn, setUsername }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPhoneMode, setIsPhoneMode] = useState(false); // email or phone mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    setIsLogin(mode !== "signup");
  }, [mode]);

  // Setup Recaptcha
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
    }
  };

  // Send OTP for mobile
  const sendOtp = async () => {
    if (!phone) return alert("Please enter phone number");
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setVerificationResult(confirmation);
      alert("OTP sent successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Error sending OTP ❌");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp || !verificationResult) return alert("Please enter OTP");
    try {
      await verificationResult.confirm(otp);
      alert("Login Successful ✅");
      setIsLoggedIn(true);
      setUsername(phone);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", phone);
      navigate("/");
    } catch (error) {
      alert("Invalid OTP ❌");
    }
  };

  // Email/Password Login
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

  // Email/Password Signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful ✅");
      setIsLogin(true);
      setEmail("");
      setPassword("");
      navigate("/login?mode=login");
    } catch (error) {
      alert(error.message);
    }
  };

  // Forgot password
  const handleForgotPassword = async () => {
    if (!email) return alert("Enter your registered email first");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPhoneMode) {
      if (verificationResult) {
        verifyOtp();
      } else {
        sendOtp();
      }
    } else {
      if (isLogin) handleLogin();
      else handleSignup();
    }
  };

  return (
    <div className="login-signup-container">
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login 👨🏻‍💻" : "Sign Up 🔐"}</h2>

        {/* Toggle between email & phone login */}
        <p className="toggle-text">
          Login with{" "}
          <span
            onClick={() => setIsPhoneMode(!isPhoneMode)}
            className="toggle-link"
          >
            {isPhoneMode ? "Email" : "Phone"}
          </span>
        </p>

        {isPhoneMode ? (
          <>
            <input
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {verificationResult && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
          </>
        ) : (
          <>
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
          </>
        )}

        <button type="submit" className="btn-submit">
          {isPhoneMode
            ? verificationResult
              ? "Verify OTP"
              : "Send OTP"
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>

        {!isPhoneMode && isLogin && (
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

      {/* Invisible reCAPTCHA for phone auth */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginSignup;






