// FilterOptions.tsx
import React from "react";

interface FilterOptionsProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

const cuisines = ["Pizza", "Cakes" , "Noodles" , "Burgers" , "Cafe" , "Pasta" , "Tehari" , "Kebaba" , "Biryani" ,"Chicken" , "Pulao" , "Kacchi"];

const FilterOptions: React.FC<FilterOptionsProps> = ({ selectedFilters, setSelectedFilters }) => {

  const handleFilterClick = (cuisine: string) => {
    if (selectedFilters.includes(cuisine)) {
      setSelectedFilters(selectedFilters.filter(f => f !== cuisine));
    } else {
      setSelectedFilters([...selectedFilters, cuisine]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => handleFilterClick(cuisine)}
          className={`px-3 py-1 rounded-full border cursor-pointer ${
            selectedFilters.includes(cuisine)
              ? "bg-orange-500 text-white border-orange-500 "
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
};

export default FilterOptions;
