// src/components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, setCartItems, removeFromCart, clearCart, isLoggedIn }) => {
  const navigate = useNavigate();

  // Update quantity
  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return; // Prevent 0 or negative quantity
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQty;
    setCartItems(updatedCart);
  };

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

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
      sessionStorage.setItem('fromCart', 'true');
      navigate('/login');
    }
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <img
          src="https://cdn-icons-png.flaticon.com/512/15017/15017806.png"
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
                  <p>{formatINR(Number(item.price) * (item.quantity || 1))}</p>

                  {/* Quantity controls */}
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(index)} className="btn-remove">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3>Total: {formatINR(total)}</h3>

          <div className="cart-buttons">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to 🧹 clear the cart?")) {
                  clearCart();
                }
              }}
              className="btn-clear"
            >
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
