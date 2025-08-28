import React, { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { restaurantFormSchema, type RestaurantFormSchema,  } from "../../schemaZOD/restaurantSchema";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { RESTAURANT_API_END_POINT } from "../../utils/apiEndPoint";
import useGetRestaurant from "../../hooks/apiHooks/useGetRestaurant";
import { useAppSelector } from "../../hooks/useReduxTypeHooks";





const Restaurant = () => {
  const {restaurant} = useAppSelector((state)=>state.restaurant)
  const [reFetch , setReFetch] = useState<boolean>(false)


  // console.log(restaurant)
  useGetRestaurant({dependency: reFetch})
  const [input , setInput] = useState<RestaurantFormSchema>({
    restaurantName: restaurant?.restaurantName || "" ,
    city : restaurant?.city || "" ,
    country: restaurant?.country || "" ,
    deliveryTime: restaurant?.deliveryTime || 0 ,
    cuisines: restaurant?.cuisines || [] ,
  })
  const [error, setError] = useState<Partial<RestaurantFormSchema>>({});
  const [loading , setIsLoading] = useState<boolean>(false)
   



  const [preview, setPreview] = useState<string>( 
    restaurant?.coverImage ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" 
  );

  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
           const {name , value} = e.target
           setInput({...input , [name] : value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
          const result = restaurantFormSchema.safeParse(input);
          if(!result.success){
                      setError(result.error.flatten().fieldErrors as Partial<RestaurantFormSchema>)
                      setIsLoading(false)
                      return;
               }

               try {
                        const formData = new FormData();
                        formData.append("restaurantName", input.restaurantName);
                        formData.append("city", input.city);
                        formData.append("country", input.country);
                        formData.append("deliveryTime",String(input.deliveryTime));
                        formData.append("cuisines", input.cuisines.join(","));
                
                        const fileInput = imageRef.current?.files?.[0];
                        if (fileInput && fileInput.size > 5*1024*1024) {
                          setIsLoading(false)
                          toast.error("File size should be less than 5MB");
                          return;
                        }
                        if (fileInput) {
                            formData.append("coverImage", fileInput);
                        }
                        // api fetch
                        let res;
                        if (restaurant) {
                          // update hole patch call hobe
                          res = await axios.patch(
                            `${RESTAURANT_API_END_POINT}`,
                            formData,
                            { withCredentials: true }
                          );
                        } else {
                          // new restaurant create hole post call hobe
                          res = await axios.post(
                            `${RESTAURANT_API_END_POINT}`,
                            formData,
                            { withCredentials: true }
                          );
                        }
                        if(res?.data?.success){
                          setReFetch(true)
                          setIsLoading(false)
                          toast.success(res.data.message)
                        }

               } catch (error) {
                setIsLoading(false)
                const err = error as AxiosError<{ message: string }>;
                console.log(err.response?.data?.message);
                toast.error(err.response?.data?.message)
               }
  };

  return (
    <div className="p-6 mt-4  max-w-3xl mx-auto bg-white  shadow-xl border-t-6 rounded-xl border-myColor min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {restaurant ? "Update Restaurant" : "Add Restaurant"}
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 ">
        <div className="relative w-full h-42 ">
          <Avatar className="w-full rounded-md h-full cursor-pointer group">
            <AvatarImage
              className="object-cover rounded-md w-full h-full "
              src={preview}
            />
            <AvatarFallback className="rounded-md">Restaurant cover image</AvatarFallback>
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <label>Restaurant Name: </label>
          <input
            type="text"
            name="restaurantName"
             placeholder="e.g. Sultan Dine"
            value={input.restaurantName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
           {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.restaurantName}
                  </span>
                )}
        </div>

        <div>
          <label>City: </label>
          <input
            type="text"
            name="city"
             placeholder="e.g. Dhaka"
            value={input.city}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
           {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.city}
                  </span>
                )}
        </div>

        <div>
          <label>Country: </label>
          <input
            type="text"
            name="country"
             placeholder="e.g. Bangladesh"
            value={input.country}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
           {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.country}
                  </span>
                )}
        </div>

        <div>
          <label>Delivery Time: </label>
          <input
            type="number"
            name="deliveryTime"
             placeholder="e.g. 30 minutes"
            value={input.deliveryTime}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
           {error && (
                  <span className="text-xs text-red-600 font-medium">
                    {error.deliveryTime}
                  </span>
                )}
        </div>

        <div className="lg:col-span-2">
          <label>Cuisines:</label>
          <input
            type="text"
            name="cuisines"
            placeholder="e.g. Italian, Chinese, Japanese"
            value={input.cuisines}
            onChange={(e)=>setInput({...input , cuisines: e.target.value.toLocaleLowerCase().split(",")})}
            className="border p-2 w-full rounded-md "
          />
        </div>

        <div className="lg:col-span-2 flex justify-center">
          {
            loading ? <Button
            className="bg-myColor hover:scale-101 text-white hover:bg-myColor !px-10 py-2 rounded cursor-pointer"
          >
            <Loader2 className="animate-spin" /> Please wait...
          </Button> : <button
            type="submit"
            className="bg-myColor hover:scale-101 text-white px-6 py-2 rounded cursor-pointer"
          >
            {restaurant ? "Update Restaurant" : "Add Restaurant"}
          </button>
          }
          
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
