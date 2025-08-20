import React from 'react'
import { Button } from '../ui/button'

function AvailableMenu({menus}) {
  return (
   <div className='flex flex-wrap gap-4 justify-start mt-4'>
        {
            menus.map((menu ,index)=>{
                return  <div key={index} className=' '>

                <div className='w-82 h-92 shadow-xl'>
                  <div >
                     <img className='w-full h-34 object-cover rounded-md ' src={menu?.foodImage} alt="" />
                  </div>
                    <div className='p-4 '>
                    <h3 className='text-xl font-bold text-gray-600 my-1'>{menu?.foodName}</h3>
                    <p className='text-sm text-gray-600 '>{menu?.description}</p>
                    <p className='text-lg font-bold'>Price: <span className='text-myColor font-medium'>${menu?.price}</span></p>
                    <Button className='bg-myColor hover:bg-myColor cursor-pointer hover:scale-101 my-1'>
                         Add to Cart
                    </Button>
                    </div>
                 </div>
             </div>
            })
        }
   </div>
  )
}

export default AvailableMenu
