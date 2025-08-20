import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { FiPlus } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { MENU_API_END_POINT } from "../../../utils/apiEndPoint";



// interface MenuDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: { foodName: string; description: string; price: number; foodImage: string }) => void;
//   defaultValues?: { foodName: string; description: string; price: number; foodImage: string };
// }

const MenuDialog = ({ isOpen, onClose,  defaultValues }) => {
  const  imageRef = useRef<HTMLInputElement | null>(null)
  const [loading , setIsLoading] = useState<boolean>(false)
  
  const [preview, setPreview] = useState<string>(  );
  
  const [data, setData] = useState({
    foodName: "",
    description: "",
    price: "",
    foodImage: ""
  });

  useEffect(() => {
    if (defaultValues) {
      setData(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }

  }
  const handleSubmit = async () => {
          const formData = new FormData()
          formData.append("foodName" , data.foodName)
          formData.append("description" , data.description)
          formData.append("price" , data.price)

            const fileInput = imageRef.current?.files?.[0];
                  if (fileInput && fileInput.size > 5*1024*1024) {
                    setIsLoading(false)
                    toast.error("File size should be less than 5MB");
                    return;
                  }
                  if (fileInput) {
                      formData.append("coverImage", fileInput);
              }
              if(defaultValues){
                try {
                  const res = await axios.post(`${MENU_API_END_POINT}${"menuId"}` , {formData} , {withCredentials: true})
                  if(res.data.success){
                    toast.success(res.data.meesage)
                  }
                 } catch (error: any) {
                  console.log(error)
                  toast.error(error?.response?.data?.meesage)
                 }
              }else{
               try {
                const res = await axios.post(`${MENU_API_END_POINT}` , {formData} , {withCredentials: true})
                if(res.data.success){
                  toast.success(res.data.meesage)
                }
               } catch (error: any) {
                console.log(error)
                toast.error(error?.response?.data?.meesage)
               }
              }

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
            value={data.foodName}
            onChange={handleChange}
            placeholder="Food Name"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="price"
            value={data.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 w-full rounded"
          />
            <div className="flex justify-center mb-6">
        <div className="relative w-full h-42 ">
          <Avatar className="w-full rounded-md h-full cursor-pointer group">
            <AvatarImage
              className="object-cover rounded-md w-full h-full "
              src={preview}
            />
            <AvatarFallback >R</AvatarFallback>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* Overlay */}
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute rounded-md inset-0 bg-gray-500 opacity-0 group-hover:opacity-50 flex items-center justify-center transition-opacity "
            >
              <FiPlus className="text-white" size={28} />
            </div>
          </Avatar>
        </div>
      </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          {
            loading? <Button className="bg-myColor hover:bg-myColor hover:scale-101">
                     <Loader2 className="animate-spin"/>
            </Button>:
                <Button className="bg-myColor hover:bg-myColor hover:scale-101" onClick={handleSubmit}>
                {defaultValues ? "Update" : "Add"}
              </Button>
          }
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
