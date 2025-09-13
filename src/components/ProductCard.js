import React from 'react';
import './ProductCard.css';


const ProductCard = ({ product, addToCart }) => {
  const price = Number(product.price); // Convert to number

  // Format the price as INR with 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,  // Always show 2 decimals
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <div className='product-main'>
      <img
        src={product.image}
        alt={product.name}
        width="100%"
        height="150"
        style={{ objectFit: 'cover' }}
      />
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p> {/* Show formatted price in INR */}
      <button className='btn-add-to-cart' onClick={() => addToCart(product)} style={{ marginTop: '10px' }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
