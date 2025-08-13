import React, { useState, type ChangeEvent } from "react";
import { FiFlag, FiMapPin, FiSearch, FiX } from "react-icons/fi";


type Restaurant = {
  id: number;
  name: string;
  city: string;
  country: string;
  cuisines: string[];
  image: string;
};

const SearchPage: React.FC = () => {


  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<string[]>(["Italian", "Dhaka"]);
  const [restaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Burger King",
      city: "Dhaka",
      country: "Bangladesh",
      cuisines: ["Fast Food", "American"],
      image: "/images/burger.jpg",
    },
    {
      id: 2,
      name: "Pizza Hut",
      city: "Chittagong",
      country: "Bangladesh",
      cuisines: ["Pizza", "Italian"],
      image: "/images/pizza.jpg",
    },
  ]);

  const handleSearch = () => {
    if (searchText.trim()) {
// 
    }
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  return (
    <div className="flex">
      {/* Left - Filters */}
      <aside className="w-[20%] min-h-screen border-r p-4 hidden md:block">
        <h2 className="font-semibold text-gray-700 mb-4">Filters</h2>
        {/* Filter UI Later */}
        <p className="text-gray-500 text-sm">Filter options go here...</p>
      </aside>

      {/* Right - Content */}
      <main className="w-full md:w-[90%] p-4">
        {/* Search bar */}
        <div className="flex items-center bg-white shadow rounded-full overflow-hidden max-w-xl">
          <input
            type="text"
            placeholder="Search by restaurant and cuisines"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            className="flex-1 px-4 py-2 outline-none w-full"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Results info */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="font-medium text-gray-700">
            ({restaurants.length}) restaurants found
          </span>

          {/* Active filters */}
          {filters.map((filter) => (
            <div
              key={filter}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
            >
              {filter}
              <button
                onClick={() => handleRemoveFilter(filter)}
                className="ml-2 text-gray-600 hover:text-red-500 cursor-pointer"
              >
                <FiX  size={14} />
              </button>
            </div>
          ))}

          {/* Clear all */}
          {filters.length > 0 && (
            <button
              onClick={handleClearFilters}
              className="ml-auto rounded-md text-sm text-red-500 p-2 hover:bg-myColor/10 cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Restaurant cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {restaurants.map((rest) => (
    <div
      key={rest.id}
      className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
    >
      {/* Image */}
      <img
        src={rest.image}
        alt={rest.name}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{rest.name}</h3>

        {/* City */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
          <FiMapPin className="text-orange-500" />
          <span className="font-medium">City:</span>
          <span>{rest.city}</span>
        </div>

        {/* Country */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FiFlag className="text-green-500" />
          <span className="font-medium">Country:</span>
          <span>{rest.country}</span>
        </div>

        {/* Cuisines */}
        <div className="flex flex-wrap gap-2 mt-3">
          {rest.cuisines.map((cuisine, index) => (
            <span
              key={index}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-xs font-medium"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto flex justify-end">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer">
            View Menu
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      </main>
    </div>
  );
};

export default SearchPage;
