dw// src/pages/LoginSignup.js

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FcGoogle } from "react-icons/fc"; // fc = flat color icons

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./LoginSignup.css";

const LoginSignup = ({ setIsLoggedIn, setUsername }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    setIsLogin(mode !== "signup");
  }, [mode]);

  const provider = new GoogleAuthProvider();

  // 🔹 Email/Password Login
  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful ✅");
      setIsLoggedIn(true);
      setUsername(email);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", email);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Email/Password Signup
  const handleSignup = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match ❌");
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful ✅ Now you can login.");
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login?mode=login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
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

  // 🔹 Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName || user.email} ✅`);
      setIsLoggedIn(true);
      setUsername(user.displayName || user.email);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user.displayName || user.email);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Form submit
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

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <button type="submit" className="btn-submit" disabled={loading}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <button
  type="button"
  onClick={handleGoogleSignIn}
  className="btn-google">
  <FcGoogle size={24} />
  {isLogin ? "Sign in with Google" : "Sign up with Google"}
</button>

        {isLogin && (
          <p
            onClick={handleForgotPassword}
            style={{ color: "#110acdff", cursor: "pointer", marginTop: "10px" }}
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
