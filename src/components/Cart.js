// src/components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, clearCart, isLoggedIn }) => {
  const navigate = useNavigate();

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  // Format price in Indian currency
  const formatINR = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  // Handle Place Order button click
  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      navigate('/delivery');
    } else {
      // Store that the user is coming from cart and redirect to login
      sessionStorage.setItem('fromCart', 'true');
      navigate('/login');
    }
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <img
          src="https://cdn-icons-png.flaticon.com/512/15017/15017806.png" // Empty cart icon
          alt="Empty Cart"
          className="emptycart-icon"
        />
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{formatINR(Number(item.price))}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="btn-remove">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3>Total: {formatINR(total)}</h3>

          <div className="cart-buttons">
            <button onClick={clearCart} className="btn-clear">
              Clear Cart
            </button>

            <button onClick={handlePlaceOrder} className="btn-place-order">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
