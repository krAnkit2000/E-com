// src/pages/Home.js
import React from 'react';

const Home = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 150, image: 'https://via.placeholder.com/100' },
    // Add more products here
  ];

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
