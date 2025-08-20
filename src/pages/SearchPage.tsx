// SearchPage.tsx
import React, { useState, type ChangeEvent } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import RestaurantCard from "../components/shared/RestaurantCard";
import FilterOptions from "../components/shared/FilterOptions";
import { useAppSelector } from "../hooks/useReduxTypeHooks";
import useGetAllRestaurant from "../hooks/apiHooks/useGetAllRestaurant";
import { useParams } from "react-router";

const SearchPage: React.FC = () => {
  const { searchText } = useParams();
  const [searchCusines, setSearchCuisines] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  const { allRestaurant } = useAppSelector((state) => state.restaurant);

  useGetAllRestaurant({
    searchText,
    cuisines: filters.join(",").toLocaleLowerCase() || searchCusines,
    // dependency: searchText + filters.join(","),
  });

  const handleSearch = () => {
    // console.log("Search triggered for:", searchText, filters);
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Left - Filters */}
      <aside className="sm:w-[20%] sm:min-h-screen sm:border-r mt-10 p-4">
        <h2 className="font-semibold text-gray-700 mb-4">Filters</h2>
        <FilterOptions selectedFilters={filters} setSelectedFilters={setFilters} />
      </aside>

      {/* Right - Content */}
      <main className="w-full md:w-[90%] p-4">
        {/* Search bar */}
        <div className="flex items-center bg-white shadow rounded-full overflow-hidden max-w-xl">
          <input
            type="text"
            placeholder="Search by restaurant and cuisines"
            value={searchCusines}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchCuisines(e.target.value)}
            className="flex-1 px-4 py-2 outline-none w-full"
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
            ({allRestaurant?.length || 0}) restaurants found {allRestaurant && `in ${searchText}`}
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
                <FiX size={14} />
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
          {allRestaurant?.length > 0 ? (
            allRestaurant.map((rest, index) => <RestaurantCard key={index} rest={rest} />)
          ) : (
            <p className="text-gray-500 col-span-full">No restaurants found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
