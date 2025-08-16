import React from 'react'
import { Button } from '../ui/button'

function AvailableMenu() {
  return (
   <div className='flex flex-wrap gap-4 justify-center mt-4'>
        {
            [1,2,3,4].map((_,index)=>{
                return  <div key={index} className=' '>

                <div className='w-82 h-82 shadow-xl'>
                  <div >
                     <img className='w-full h-[35%] rounded-xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" alt="" />
                  </div>
                    <div className='p-4 '>
                    <h3 className='text-xl font-bold text-gray-600 my-1'>tandori biriyani</h3>
                    <p className='text-sm text-gray-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo accusantium eum delectus!</p>
                    <p className='text-lg font-bold'>Price: <span className='text-myColor font-medium'>${100}</span></p>
                    <Button className='bg-myColor hover:bg-myColor cursor-pointer hover:scale-105 my-1'>
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
