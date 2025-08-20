import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import MenuDialog from "../../components/shared/Admin/MenuDialog";


interface MenuItem {
  foodName: string;
  description: string;
  price: number;
  foodImage: string;
}

const Menus = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      foodName: "Tandoori Biryani",
      description: "Delicious biryani with smoky flavor",
      price: 100,
      foodImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMenu, setEditMenu] = useState<MenuItem | null>(null);

  const handleAddMenu = (data: MenuItem) => {
    setMenus([...menus, data]);
  };

  const handleEditMenu = (data: MenuItem) => {
    setMenus(menus.map((m) => (m.foodName === editMenu?.foodName ? data : m)));
  };

  return (
    <div className="p-6 mt-22">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Menus</h2>
        <Button
          className="bg-myColor hover:bg-myColor/90"
          onClick={() => {
            setEditMenu(null);
            setOpenDialog(true);
          }}
        >
          + Add Menu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu, index) => (
          <div key={index} className="shadow-xl rounded-lg overflow-hidden">
            <img
              src={menu.foodImage}
              alt={menu.foodName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-700">{menu.foodName}</h3>
              <p className="text-sm text-gray-600">{menu.description}</p>
              <p className="text-lg font-bold mt-2">
                Price: <span className="text-myColor">${menu.price}</span>
              </p>
              <Button
                className="bg-myColor w-full hover:bg-myColor/90 mt-3 cursor-pointer"
                onClick={() => {
                  setEditMenu(menu);
                  setOpenDialog(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <MenuDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={editMenu ? handleEditMenu : handleAddMenu}
        // defaultValues={editMenu || undefined}
      />
    </div>
  );
};

export default Menus;
