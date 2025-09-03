import React, { useEffect, useMemo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxTypeHooks";
import {
  clearCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../redux/cartSlice";
import CheckoutDialog from "../components/shared/CheckoutDialog";


const Cart = () => {

    useEffect(() => {
      document.title = `Cart | MealMart`;
    }, []);
  

  const { foods } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // total price calculation
  const totalPrice = useMemo(() => {
    return foods.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [foods]);

  const handleIncrease = (foodId: string) => {
    dispatch(increaseQuantity(foodId));
  };

  const handleDecrease = (foodId: string) => {
    dispatch(decreaseQuantity(foodId));
  };

  const handleRemove = (foodId: string) => {
    dispatch(deleteFromCart(foodId));
  };

  const handleClearAll = () => {
    dispatch(clearCart());
  };

  return (
    <div className=" min-h-[70vh] pt-22">
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
            {foods &&
              foods.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.foodImage}
                      alt={item.foodName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2">{item.foodName}</td>
                  <td className="p-2 text-myColor font-bold">${item.price}</td>
                  <td className="p-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-myColor text-white cursor-pointer"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-bold px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-myColor text-white cursor-pointer"
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="p-2 text-right">
                    ${item.price * item.quantity}
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="px-4 py-2 rounded-lg bg-myColor hover:scale-101 cursor-pointer text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

            {foods?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  Cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total + Checkout */}
        <div className="flex justify-between items-center px-4 py-4">
          <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
          <CheckoutDialog total={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
