import React from "react";
import { useNavigate } from "react-router-dom";
import './Delivery.css'; // reuse CSS or create new
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
      <h2 className="text-2xl font-bold mt-4">Order Confirmed!</h2>
      <p className="mt-2">Your order has been successfully placed ✅</p>
      <button
        onClick={() => navigate("/")}
        className="btn-close mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirm;
