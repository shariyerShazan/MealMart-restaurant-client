import React from 'react'
import { FiFlag, FiMapPin } from 'react-icons/fi'
import { useNavigate } from 'react-router'

const RestaurantCard = ({rest}) => {

const navigate = useNavigate()

  return (
    <div>
        <div
key={rest.id}
className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
>
{/* Image */}
<img
  src={rest?.coverImage}
  alt={rest.restaurantName}
  className="w-full h-40 object-cover"
/>

{/* Content */}
<div className="p-4 flex-1 flex flex-col">
  <h3 className="text-lg font-semibold">{rest?.restaurantName}</h3>

  {/* City */}
  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
    <FiMapPin className="text-orange-500" />
    <span className="font-medium">City:</span>
    <span>{rest?.city}</span>
  </div>

  {/* Country */}
  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
    <FiFlag className="text-green-500" />
    <span className="font-medium">Country:</span>
    <span>{rest?.country}</span>
  </div>

  {/* Cuisines */}
  <div className="flex flex-wrap gap-2 mt-3">
    {rest.cuisines.map((cuisine : string, index: number) => (
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
    <button onClick={()=> navigate(`/restaurant/${rest._id}`)} className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer">
      View Menu
    </button>
  </div>
</div>
</div>
    </div>
  )
}

export default RestaurantCard
