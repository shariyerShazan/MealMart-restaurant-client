import React, { useState } from "react";
import { FaMinus,  FaPlus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, title: "", price: 100, quantity: 1, image: "https://via.placeholder.com/50" },
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

  {/* Table Wrapper */}
  <div className="overflow-x-auto mt-6 rounded-xl border">
    <table className="w-full text-gray-600 whitespace-nowrap border-collapse [&>tbody>tr>td]:px-4 [&>thead>tr>th]:px-4">
      <thead>
        <tr className="bg-myColor/10 text-left">
          <th className="p-2">Item</th>
          <th className="p-2">Title</th>
          <th className="p-2">Price</th>
          <th className="p-2 text-right">Quantity</th>
          <th className="p-2 text-right">Total</th>
          <th className="p-2 text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="p-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-cover rounded-full"
              />
            </td>
            <td className="p-2">{item.title}</td>
            <td className="p-2 text-myColor font-bold">${item.price}</td>
            <td className="p-2 flex items-center justify-end gap-2">
              <button
                onClick={() => handleDecrease(item.id)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-myColor text-white cursor-pointer"
              >
                <FaMinus />
              </button>
              <span className="font-bold px-2">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item.id)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-myColor text-white cursor-pointer"
              >
                <FaPlus />
              </button>
            </td>
            <td className="p-2 text-right">${item.price * item.quantity}</td>
            <td className="p-2 text-right">
              <button
                onClick={() => handleRemove(item.id)}
                className="px-4 py-2 rounded-lg bg-myColor hover:scale-105 cursor-pointer text-white"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}

        {cart.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center p-4 text-gray-500">
              Cart is empty
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  
  );
};

export default Cart;
