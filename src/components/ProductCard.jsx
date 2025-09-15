// src/components/ProductCard.jsx
import React from 'react';

function ProductCard() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80 mx-auto text-center">
      <img src="https://via.placeholder.com/300x200" alt="Producto" className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-2xl font-bold mt-4">Nombre del producto</h2>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Comprar</button>
    </div>
  );
}

export default ProductCard;
