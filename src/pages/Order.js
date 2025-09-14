// src/pages/Order.js
import React, { useEffect, useState } from 'react';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div style={{ padding: '80px 20px' }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Price (₹)</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.product}</td>
                <td style={tdStyle}>{order.quantity}</td>
                <td style={tdStyle}>{order.price}</td>
                <td style={tdStyle}>{order.date}</td>
                <td style={tdStyle}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { border: '1px solid #ccc', padding: '10px', background: '#f5f5f5', textAlign: 'left' };
const tdStyle = { border: '1px solid #ccc', padding: '10px' };

export default Order;
