import React, { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { restaurantFormSchema, RestaurantFormSchema } from "../../schemaZOD/restaurantSchema";




const Restaurant = () => {
  const [input , setInput] = useState<RestaurantFormSchema>({
    restaurantName: "" ,
    city : "" ,
    country: "" ,
    deliveryTime: 0 ,
    cuisines: [] ,
    // coverImage: undefined 
  })
  const [error, setError] = useState<Partial<RestaurantFormSchema>>({});
  const [loading , setIsLoading] = useState<boolean>(false)
   
   const restaurant = true
  const [preview, setPreview] = useState<string>(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" 
  );
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
           const {name , value} = e.target
           setInput({...input , [name] : value})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = restaurantFormSchema.safeParse(input);
    if(!result.success){
                setError(result.error.flatten().fieldErrors as Partial<RestaurantFormSchema>)
                setIsLoading(false)
                return;
            }
    if (restaurant) {
      console.log("Updating restaurant:", data);
    } else {
      console.log("Adding restaurant:", data);
    }
  };

  return (
    <div className="p-6 mt-22  max-w-3xl mx-auto bg-white rounded shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {restaurant ? "Update Restaurant" : "Add Restaurant"}
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full h-42 ">
          <Avatar className="w-full rounded-md h-full cursor-pointer group">
            <AvatarImage
              className="object-cover w-full h-full "
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <label>Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
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
          <label>City</label>
          <input
            type="text"
            name="city"
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
          <label>Country</label>
          <input
            type="text"
            name="country"
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
          <label>Delivery Time (minutes)</label>
          <input
            type="number"
            name="deliveryTime"
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
          <label>Cuisines (e.g. Italian, Chinese, Japanese,)</label>
          <input
            type="text"
            name="cuisines"
            value={input.cuisines}
            onChange={}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="lg:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-myColor hover:scale-105 text-white px-6 py-2 rounded cursor-pointer"
          >
            {restaurant ? "Update Restaurant" : "Add Restaurant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
