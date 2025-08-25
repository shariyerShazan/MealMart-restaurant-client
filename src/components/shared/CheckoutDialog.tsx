import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import axios from "axios";
import { ORDER_API_END_POINT } from "../../utils/apiEndPoint";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/useReduxTypeHooks";

interface CheckoutDialogProps {
  total: number;
  restaurantId: string;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ total, restaurantId }) => {
  const { user } = useAppSelector((state) => state.user);
  const { foods } = useAppSelector((state) => state.cart);

  // Local state for editable fields
  const [contactNumber, setContactNumber] = useState(user?.contact || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleConfirm = async () => {
    try {
      const payload = {
        cartItems: foods.map((item) => ({
          menuId: item._id,
          foodName: item.foodName,
          price: item.price,
          foodImage: item.foodImage,
          quantity: item.quantity,
        })),
         deliveryInfo: {
          email: user?.email,
          contact: contactNumber,
          fullName: user?.fullName,
          address: address,
          city,
          country,
        },
        restaurantId: foods[0].restaurantId.restaurantId,
        totalAmount:total
      };

      const res = await axios.post(
        `${ORDER_API_END_POINT}/create-checkout-session`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        if (res.data.session?.url) {
          window.location.href = res.data.session.url; 
        }
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    //   toast.error("Checkout failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-myColor text-white hover:bg-myColor/90 cursor-pointer">
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Proceed to Checkout</DialogTitle>
          <DialogDescription>
            Please review your order before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <form className="flex flex-col gap-4">
            {/* Name & Email (readonly) */}
            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold">Full Name:</label>
                <input
                  className="px-2 py-1 border-gray-200 border rounded-md bg-gray-100 cursor-not-allowed"
                  type="text"
                  value={user.fullName}
                  readOnly
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold">Email:</label>
                <input
                  className="px-2 py-1 border-gray-200 border rounded-md bg-gray-100 cursor-not-allowed"
                  type="text"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Contact Number:</label>
              <input
                className="px-2 py-1 border-gray-200 border rounded-md"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value.toString())}
                placeholder="Enter your contact number"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Adress:</label>
              <input
                className="px-2 py-1 border-gray-200 border rounded-md"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>

            {/* City & Country */}
            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold">City:</label>
                <input
                  className="px-2 py-1 border-gray-200 border rounded-md"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold">Country:</label>
                <input
                  className="px-2 py-1 border-gray-200 border rounded-md"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
              </div>
            </div>
          </form>

          <p className="text-lg font-bold mt-4">
            Total Price: <span className="text-myColor">${total}</span>
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleConfirm}
            className="bg-myColor text-white hover:bg-myColor/90 cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
