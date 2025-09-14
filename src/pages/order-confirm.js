// src/pages/OrderConfirm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirm.css';

const OrderConfirm = () => {
  const navigate = useNavigate();

  return (
    <div className="delivery-container text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6815/6815043.png"
        alt="Order Confirmed"
        className="modal-img mx-auto"
      />
      <h2>Order Confirmed! ✅</h2>
      <p>Your order has been successfully placed.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate("/")} className="btn-close">Back to Home</button>
        <button onClick={() => navigate("/orders")} className="btn-close" style={{ marginLeft: '10px' }}>View My Orders</button>
      </div>
    </div>
  );
};

export default OrderConfirm;
