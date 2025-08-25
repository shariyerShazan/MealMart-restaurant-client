import React, { useState } from "react";

import { useAppSelector } from "../../hooks/useReduxTypeHooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

interface CheckoutDialogProps {
  total: number;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ total }) => {
  const { user } = useAppSelector((state) => state.user);

  // Local state for editable fields
  const [contactNumber, setContactNumber] = useState(user?.contact);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);

  const handleConfirm = () => {
    const orderData = {
      fullName: user?.fullName,
      email: user?.email,
      contactNumber,
      address,
      city,
      country,
      total,
    };
    console.log("Order Data: ", orderData);

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
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your contact number"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Address:</label>
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

          <p className="text-lg font-bold mt-4">Total Price: <span className="text-myColor">${total}</span></p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button  variant="outline">Cancel</Button>
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
