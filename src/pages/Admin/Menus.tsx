import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import MenuDialog from "../../components/shared/Admin/MenuDialog";
import { useAppSelector } from "../../hooks/useReduxTypeHooks";
import useGetRestaurant from "../../hooks/apiHooks/useGetRestaurant";


interface MenuItem {
  foodName: string;
  description: string;
  price: number;
  foodImage: string;
}

const Menus = () => {
  const [addOne, setAddOne]= useState<boolean>(false)

  useGetRestaurant({dependency:addOne})

   const { restaurant} = useAppSelector((state)=> state.restaurant)
   const menus = restaurant?.menus
  const [openDialog, setOpenDialog] = useState(false);
  const [editMenu, setEditMenu] = useState<MenuItem | null>(null);

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

      <div className={`${menus.length === 0 ? " ": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}>
        {menus.length === 0 ?    
         <div className="flex justify-center items-center">
              <p className="text-center text-xl font-bold text-myColor">No Menu Found, Please Add First</p>
         </div>    
        :  menus.map((menu, index) => (
          <div key={index} className="shadow-xl rounded-lg overflow-hidden">
            <img
              src={menu?.foodImage}
              alt={menu?.foodName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-700">{menu?.foodName}</h3>
              <p className="text-sm text-gray-600">{menu?.description}</p>
              <p className="text-lg font-bold mt-2">
                Price: <span className="text-myColor">${menu?.price}</span>
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
        setAddOne={setAddOne}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        defaultValues={editMenu || undefined}
      />
    </div>
  );
};

export default Menus;
