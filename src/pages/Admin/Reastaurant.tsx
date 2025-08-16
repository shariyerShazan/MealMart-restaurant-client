import React, { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";


type RestaurantProps = {
  restaurant?: boolean;
  defaultImage?: string; 
};

const Restaurant: React.FC<RestaurantProps> = ({ restaurant, defaultImage }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryTime, setDeliveryTime] = useState<number | "">("");
  const [cuisines, setCuisines] = useState("");

  const [preview, setPreview] = useState<string>(
    defaultImage ||
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: cuisines.split(",").map((c) => c.trim()),
      coverImage,
    };

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
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>Delivery Time (minutes)</label>
          <input
            type="number"
            value={deliveryTime}
            onChange={(e) =>
              setDeliveryTime(e.target.value ? Number(e.target.value) : "")
            }
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="lg:col-span-2">
          <label>Cuisines (e.g. Italian, Chinese, Japanese,)</label>
          <input
            type="text"
            value={cuisines}
            onChange={(e) => setCuisines(e.target.value.split(","))}
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
