// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Products from './pages/Products';
import Cart from './components/Cart';
import Delivery from './pages/Delivery';
import LoginSignup from './pages/LoginSignup';
import OrderConfirm from "./pages/order-confirm"; // OrderConfirm component
import Order from './pages/Order'; // Order component

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // Cart handlers
  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (indexToRemove) =>
    setCartItems(cartItems.filter((_, idx) => idx !== indexToRemove));
  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <Header 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        username={username} 
        setUsername={setUsername} 
      />

      <Routes>
        {/* Home / Products */}
        <Route path="/" element={<Products addToCart={addToCart} />} />

        {/* Cart Page */}
        <Route 
          path="/cart"
          element={
            <Cart 
            cartItems={cartItems} 
            setCartItems={setCartItems}   // 👈 yeh add karo
            removeFromCart={removeFromCart} 
            clearCart={clearCart} 
            isLoggedIn={isLoggedIn} 
          />} 
        />

        {/* Delivery Page (Login Protected) */}
        <Route 
          path="/delivery"
          element={
            isLoggedIn ? <Delivery cartItems={cartItems} clearCart={clearCart} /> : <Navigate to="/login" />
          } 
        />

        {/* Login / Signup */}
        <Route 
          path="/login"
          element={<LoginSignup setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
        />

        {/* Order Confirm Page */}
        <Route 
          path="/orderconfirm"
          element={isLoggedIn ? <OrderConfirm /> : <Navigate to="/login" />}
        />

        {/* Orders Page */}
        <Route 
          path="/orders"
          element={isLoggedIn ? <Order /> : <Navigate to="/login" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
