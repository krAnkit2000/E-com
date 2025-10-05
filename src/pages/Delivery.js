import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
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

  // ✅ Handle change for Phone separately
  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- Validation aur submit code wahi jo tumhare pass already hai ---
    navigate('/orderconfirm');
  };

  return (
    <div className="delivery-container">
      <h2>𝐒𝐡𝐢𝐩𝐩𝐢𝐧𝐠 𝐃𝐞𝐭𝐚𝐢𝐥𝐬 🚛</h2>

      <form onSubmit={handleSubmit} className="delivery-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

        {/* 📱 Phone input with flags and country code */}
        <PhoneInput
          country={'in'} // default India
          value={formData.phone}
          onChange={handlePhoneChange}
          enableSearch={true}
          inputClass="phone-input"
          buttonClass="phone-flag"
        />

        <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} rows="3" required />
        <input type="text" name="landmark" placeholder="Landmark (Nearby Place)" value={formData.landmark} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State / Province" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP / PIN Code" value={formData.zip} onChange={handleChange} required />

        <h3 className='payment'>Payment Method:</h3>
        <select name="payment" value={formData.payment} onChange={handleChange} required>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        {formData.payment === "UPI" && (
          <input type="text" name="upiId" placeholder="Enter UPI ID (e.g., name@upi)" value={formData.upiId} onChange={handleChange} required />
        )}

        {formData.payment === "Card" && (
          <>
            <input type="text" name="cardNumber" placeholder="Card Number (16 digits)" value={formData.cardNumber} onChange={handleChange} required />
            <input type="text" name="cardExpiry" placeholder="Expiry Date (MM/YY)" value={formData.cardExpiry} onChange={handleChange} required />
            <input type="password" name="cardCvv" placeholder="CVV" value={formData.cardCvv} onChange={handleChange} required />
          </>
        )}

        <button type="submit" className="btn-submit">Place Order</button>
      </form>
    </div>
  );
};

export default Delivery;
