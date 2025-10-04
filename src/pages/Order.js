// src/pages/Order.js
import React, { useEffect, useState } from 'react';
import './Order.css'; // CSS file for styling cards

// Multiple dummy images for random display
const dummyImages = [
  "https://placeimg.com/220/150/fashion",
  "https://placeimg.com/220/150/people",
  "https://placeimg.com/220/150/tech",
  "https://placeimg.com/220/150/nature",
  "https://placeimg.com/220/150/animals"
];

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add a random dummy image to each order
    const ordersWithImages = savedOrders.map(order => ({
      ...order,
      image: dummyImages[Math.floor(Math.random() * dummyImages.length)]
    }));
    
    setOrders(ordersWithImages);
  }, []);

  return (
    <div style={{ padding: '20px 10px' }}>
      <h2  className='orders' >Your Orders

      <img  className='menu_btn' src="	https://cdn-icons-png.flaticon.com/512/11345/11345962.png" alt="Your Orders" />


      </h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No orders found.</p>
      ) : (
        <div className="orders-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {orders.map(order => (
            <div
              key={order.id}
              className="order-card"
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                width: '220px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                textAlign: 'center',
              }}
            >
              <img
                src={order.image}
                alt={order.product}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              />
              <h4 style={{ margin: '10px 0 5px' }}>{order.product}</h4>
              <p>Qty: {order.quantity}</p>
              <p>Price: ₹{order.price}</p>
              <p>Date: {order.date}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
