import React from 'react'
import { FiClock } from 'react-icons/fi'
import AvailableMenu from '../components/shared/AvailableMenu'

const RestaurantDetails = () => {
  return (
    <div className='mt-12'>
         <div>
              <div>
                  <img className='w-full h-42 md:h-64 object-cover rounded-xl ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" alt="" />
                  <h3 className='text-xl font-bold ml-1 mt-2'>Sultan dine</h3>
                  <div>
                    {
                       <div className="flex flex-wrap gap-2 mt-3">
                       {["thai" , "biriyani" , "chinese"].map((cuisine : string, index: number) => (
                         <span
                           key={index}
                           className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-xs font-medium"
                         >
                           {cuisine}
                         </span>
                       ))}
                     </div>
                    }
                    <p className='text-lg font-bold flex items-center mt-2 gap-2 '><FiClock /> Delivery time: <span className='text-md font-medium'>35 mins</span></p>
                    <p className='mt-3 text-xl font-extrabold'>Available Menus</p>
                  </div>
                  <AvailableMenu />
              </div>
         </div>
    </div>
  )
}

export default RestaurantDetails
