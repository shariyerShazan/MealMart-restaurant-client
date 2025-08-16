import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";



interface MenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { foodName: string; description: string; price: number; foodImage: string }) => void;
  defaultValues?: { foodName: string; description: string; price: number; foodImage: string };
}

const MenuDialog: React.FC<MenuDialogProps> = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    price: 0,
    foodImage: ""
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Menu" : "Add Menu"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Food Name"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-myColor" onClick={handleSubmit}>
            {defaultValues ? "Update" : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
