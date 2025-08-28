import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";


const HeroSection: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className=" py-16">
      <div className="container mx-auto px-6 flex flex-col-reverse  md:flex-row items-center gap-10">
        
        {/* Left Text + Search */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Delicious Meals at <span className=" text-shadow-[-2px_2px_2px_#000]">Meal<span className="text-orange-500">Mart</span></span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md">
            Search restaurants by name, city, or country and explore your next favorite meal.
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex items-center bg-white shadow-lg rounded-full overflow-hidden max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search by restaurant name, city or country"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-4 py-3 outline-none text-gray-700 "
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-5 py-4 flex items-center justify-center"
            >
              <FiSearch className="" size={20} />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={`https://www.foodandwine.com/thmb/XE8ubzwObCIgMw7qJ9CsqUZocNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg`}
            alt="Delicious Burger"
            className="w-full h-96 object-cover rounded-lg drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
