import React, { useState } from 'react';
import './Delivery.css';

const Delivery = ({ cartItems, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Order placed successfully!\n' +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Address: ${formData.address}, ${formData.city} - ${formData.zip}`
    );
    clearCart();
  };



  return (
    <div className="delivery-container">
      <h2><img
          src="https://cdn-icons-png.freepik.com/512/4805/4805735.png?ga=GA1.1.1808598779.1757661919" // Logout
          alt="Cart Icon"
          className=" Icon logout-icon"
        />
Delivery Details</h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP / PIN Code"
          value={formData.zip}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Delivery;
