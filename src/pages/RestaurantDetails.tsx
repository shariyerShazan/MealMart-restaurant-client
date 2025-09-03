import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import AvailableMenu from '../components/shared/AvailableMenu'
import { useParams } from 'react-router'
import useGetSingleRestaurant from '../hooks/apiHooks/useGetSingleRestaurant'
import { useAppSelector } from '../hooks/useReduxTypeHooks'

const RestaurantDetails = () => {

    useEffect(() => {
      document.title = `Restaurant | MealMart`;
    }, []);
  
  const {restaurantId} = useParams()
  const {singleRestaurant} = useAppSelector((state)=>state.restaurant)
  // const [dependency , setDependency] = useState<boolean>(false)
 
  useGetSingleRestaurant({restaurantId })
  return (
    <div className='pt-22 mb-6 min-h-[70vh]'>
         <div>
              <div>
                  <img className='w-full h-42 md:h-64 object-cover rounded-xl ' src={singleRestaurant?.coverImage} alt="" />
                  <h3 className='text-xl font-bold ml-1 mt-2'>{singleRestaurant?.restaurantName}</h3>
                  <div>
                    {
                       <div className="flex flex-wrap gap-2 mt-3">
                       {singleRestaurant?.cuisines?.map((cuisine : string, index: number) => (
                         <span
                           key={index}
                           className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-xs font-medium"
                         >
                           {cuisine}
                         </span>
                       ))}
                     </div>
                    }
                    <p className='text-lg font-bold flex items-center mt-2 gap-2 '><FiClock /> Delivery time: <span className='text-md font-medium'>{singleRestaurant?.deliveryTime}</span></p>
                    <p className='mt-8 text-xl font-extrabold text-center sm:text-start '>Available Menus: {singleRestaurant?.menus?.length}</p>
                  </div>
                  <AvailableMenu restaurantId={restaurantId}  menus={singleRestaurant?.menus}/>
              </div>
         </div>
    </div>
  )
}

export default RestaurantDetails
