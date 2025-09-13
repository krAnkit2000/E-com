// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Products from './pages/Products';
import Cart from './components/Cart';
import Delivery from './pages/Delivery';
import LoginSignup from './pages/LoginSignup';

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
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route 
          path="/cart"
          element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} isLoggedIn={isLoggedIn} />} 
        />
        <Route 
          path="/delivery"
          element={isLoggedIn ? <Delivery cartItems={cartItems} clearCart={clearCart} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login"
          element={<LoginSignup setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
