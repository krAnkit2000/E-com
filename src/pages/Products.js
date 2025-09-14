import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Product.css';




const sampleProducts = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,  // Ensure the product name follows sequence (Product 1, Product 2, ...)
  price: (Math.random() * 100 + 10).toFixed(2),
  image: `https://picsum.photos/200?random=${i + 1}`,
}));

const Products = ({ addToCart }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;  // Show 20 products per page

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Get the products for the current page
  const currentProducts = sampleProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle Next Page
  const nextPage = () => {
    if (currentPage < Math.ceil(sampleProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous Page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='all-Product'>
      <h2 className='all-Product'>All Products</h2>

      {/* Grid of products */}
      <div className='product-list'>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Page Indicator */}
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <span>
          Page {currentPage} of {Math.ceil(sampleProducts.length / itemsPerPage)}
        </span>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(sampleProducts.length / itemsPerPage)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor:
              currentPage === Math.ceil(sampleProducts.length / itemsPerPage)
                ? 'not-allowed'
                : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
