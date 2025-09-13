// src/pages/Delivery.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Delivery.css';

const Delivery = ({ cartItems, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();              // Cart clear
    navigate('/order-confirm'); // Redirect to OrderConfirm
  };

  return (
    <div className="delivery-container">
      <h2>
        <img
          src="https://cdn-icons-png.freepik.com/512/4805/4805735.png"
          alt="Cart Icon"
          className="Icon logout-icon"
        />
        Delivery Details
      </h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} rows="3" required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP / PIN Code" value={formData.zip} onChange={handleChange} required />
        <button type="submit" className="btn-submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Delivery;
