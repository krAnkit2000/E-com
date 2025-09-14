// src/pages/Delivery.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Delivery.css';

const Delivery = ({ cartItems, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    zip: '',
    instructions: '',
    payment: 'COD',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const zipRegex = /^[0-9]{4,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const upiRegex = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/; // UPI validation

    if (!nameRegex.test(formData.name)) {
      alert("Name can only contain letters and spaces.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!zipRegex.test(formData.zip)) {
      alert("Please enter a valid ZIP / PIN code (numbers only).");
      return false;
    }
    if (!formData.address.trim()) {
      alert("Address cannot be empty.");
      return false;
    }
    if (!formData.city.trim() || !nameRegex.test(formData.city)) {
      alert("City must contain only letters.");
      return false;
    }
    if (!formData.state.trim() || !nameRegex.test(formData.state)) {
      alert("State must contain only letters.");
      return false;
    }

    // Extra validations for payment
    if (formData.payment === "UPI" && !upiRegex.test(formData.upiId)) {
      alert("Please enter a valid UPI ID (e.g., username@bank).");
      return false;
    }
    if (formData.payment === "Card") {
      if (!/^[0-9]{16}$/.test(formData.cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        alert("Expiry date must be in MM/YY format.");
        return false;
      }
      if (!/^[0-9]{3,4}$/.test(formData.cardCvv)) {
        alert("Please enter a valid CVV (3 or 4 digits).");
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Delivery Details Submitted:", formData);

    clearCart();              
    navigate('/orderconfirm'); 
  };

  return (
    <div className="delivery-container">
      <h2>
    
      𝐒𝐡𝐢𝐩𝐩𝐢𝐧𝐠 𝐃𝐞𝐭𝐚𝐢𝐥𝐬 🚛
      </h2>

      <form onSubmit={handleSubmit} className="delivery-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} rows="3" required />

        <input type="text" name="landmark" placeholder="Landmark (Nearby Place)" value={formData.landmark} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State / Province" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP / PIN Code" value={formData.zip} onChange={handleChange} required />

        {/* Payment Section */}
        <h3 className='payment'>Payment Method:</h3>
        <select name="payment" value={formData.payment} onChange={handleChange} required>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        {/* Conditional Fields */}
        {formData.payment === "UPI" && (
          <input
            type="text"
            name="upiId"
            placeholder="Enter UPI ID (e.g., name@upi)"
            value={formData.upiId}
            onChange={handleChange}
            required
          />
        )}

        {formData.payment === "Card" && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (16 digits)"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cardExpiry"
              placeholder="Expiry Date (MM/YY)"
              value={formData.cardExpiry}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="cardCvv"
              placeholder="CVV"
              value={formData.cardCvv}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" className="btn-submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Delivery;
