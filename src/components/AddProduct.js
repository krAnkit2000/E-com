import React, { useState } from "react";
import ProductCard from "./ProductCard";

const AddProduct = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }
    onAddProduct(newProduct); // parent ko bhejna
    setNewProduct({ name: "", price: "", image: "" }); // reset
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Enter product name"
        value={newProduct.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Enter product price"
        value={newProduct.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Enter image URL"
        value={newProduct.image}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
