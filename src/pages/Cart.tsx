import React, { useState } from "react";
import { FaMinus,  FaPlus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, title: "Product 1", price: 100, quantity: 1, image: "https://via.placeholder.com/50" },
    { id: 2, title: "Product 2", price: 200, quantity: 2, image: "https://via.placeholder.com/50" },
  ]);

  // increase quantity
  const handleIncrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // decrease quantity or remove
  const handleDecrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  // remove single item
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // clear all
  const handleClearAll = () => {
    setCart([]);
  };

  return (
    <div className="mt-12">
      {/* Clear All */}
      <div className="flex justify-end">
        <button
          onClick={handleClearAll}
          className="hover:underline hover:text-red-500 cursor-pointer font-bold"
        >
          Clear All
        </button>
      </div>

      {/* Table */}
      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Item</th>
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
              </td>
              <td className="p-2">{item.title}</td>
              <td className="p-2">${item.price}</td>
              <td className="p-2 flex items-center gap-2">
                {/* Decrease or Remove */}
                {(
                  <button disabled={item.quantity > 1 }
                    onClick={() => handleDecrease(item.id)}
                    className="flex items-center justify-center w-8 rounded-full h-8 bg-gray-300 cursor-pointer"
                  >
                    <FaMinus />
                  </button>
                )}

                <span className="font-bold px-2">{item.quantity}</span>

                {/* Increase */}
                <button
                  onClick={() => handleIncrease(item.id)}
                  className="flex items-center justify-center w-8 rounded-full h-8 bg-gray-300 cursor-pointer"
                >
                  <FaPlus />
                </button>
              </td>
              <td className="p-2">${item.price * item.quantity}</td>
              <td className="p-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}

          {cart.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                Cart is empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
