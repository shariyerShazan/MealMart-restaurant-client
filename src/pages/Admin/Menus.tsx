import  { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import MenuDialog from "../../components/shared/Admin/MenuDialog";
import { useAppSelector } from "../../hooks/useReduxTypeHooks";
import useGetRestaurant from "../../hooks/apiHooks/useGetRestaurant";
import axios from "axios";
import { MENU_API_END_POINT } from "../../utils/apiEndPoint";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";


interface MenuItem {
  foodName: string;
  description: string;
  price: number;
  foodImage: string;
}

const Menus = () => {

      useEffect(() => {
        document.title = `Dashboard | MealMart`;
      }, []);

  const [addOne, setAddOne]= useState<boolean>(false)
  const[deleteLoading , setDeleteLoading] = useState<boolean>(false)

useGetRestaurant({dependency:addOne})

   const { restaurant} = useAppSelector((state)=> state.restaurant)
   const menus = restaurant?.menus
  const [openDialog, setOpenDialog] = useState(false);
  const [editMenu, setEditMenu] = useState<MenuItem | null>(null);

  const handleDelete = async (menuId: string)=>{
    setDeleteLoading(true)
         try {
             const res = await axios.delete(`${MENU_API_END_POINT}/${menuId}` , {withCredentials: true})
             if(res.data.success){
                 toast.success(res.data.messaage)
                  setAddOne(true)
                 setDeleteLoading(false)
             }
         } catch (error:any) {
          toast(error.response.data.messaage)
          console.log(error)
          setDeleteLoading(false)
         }
  }

  return (
    <div className="p-6 mt-4 w-[90%] mx-auto min-h-[70vh]">
     
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Menus</h2>
        <Button
          className="bg-myColor hover:bg-myColor/90 cursor-pointer"
          onClick={ () => {
            setEditMenu({ foodName: "", description: "", price: "" , foodImage: "" })
            setOpenDialog(true);
          }}
        >
          + Add Menu
        </Button>
      </div>

      <div className={`${menus?.length === 0 ? " ": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}>
        { menus?.length === 0 ?    
         <div className="flex justify-center items-center">
              <p className="text-center text-xl font-bold text-myColor">No Menu Found, Please Add First</p>
         </div>    
        :  menus?.map((menu : MenuItem, index:number) => (
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
             <div className="flex gap-4">
             <Button
                className="bg-myColor flex-1  hover:bg-myColor/90 mt-3 cursor-pointer"
                onClick={() => {
                  setAddOne(false)
                  setEditMenu(menu);
                  setOpenDialog(true);
                }}
              >
                Edit
                </Button>
             { 
             deleteLoading? <Button disabled={true} className="bg-red-500 flex-1 hover:bg-red-500 ">
                 <Loader2 className=" animate-spin" />deleting...
             </Button>:
                <Button
                className="bg-red-500 flex-1 hover:bg-red-500 mt-3 cursor-pointer"
                onClick={()=>handleDelete(menu?._id)}
              >
                Delete
              </Button>
             }
             </div>
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
