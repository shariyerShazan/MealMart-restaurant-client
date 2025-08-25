import React, { useState } from 'react'

const UserOrder = () => {
    const [orders , setOrders] = useState<any>([1,2,3])
    if(orders?.length === 0){
        return (
            <div className='h-[70vh] flex justify-center items-center text-3xl font-semibold text-myColor'>
                     <p>No order found!</p>
            </div>
        )
    }
  return (
    <div>  
        <h2 className='text-5xl text-myColor font-bold text-center opacity-50 pb-6 border-b-2 border-b-myColor rounded-xl'>Your Order's here</h2>

        <div className='flex flex-wrap gap-5 mt-8 justify-center'>
                {
                    orders && orders.map((order , index: number)=>{
                        return <div key={index} className='p-4  w-92 shadow-xl rounded-xl border-t-6 border-myColor'>
                        <h2 className='text-2xl font-bold'>Shariyer Shazan</h2>
                        <p className='text-sm font-bold my-2'>Order summary:</p>
                          { [1,2,3].map((item , index: number)=>(
                            <div className='flex justify-between items-center gap-2 border-b-1 border-b-gray-400' key={index}>
                              <div className='flex  items-center gap-3'>
                              <img className='w-10 h-10 rounded-full object-cover  my-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" alt="" />
                              <p className='font-semibold '>pizza</p>
                              </div>
                               <p className='font-bold text-myColor text-right'>$100</p>
                            </div>
                           ))}
                         <p className='text-2xl my-4'>Order Status: <span className='text-myColor font-extrabold'>Confirm</span> </p>
                    </div>
                    })
                }
            </div>
    </div>
  )
}

export default UserOrder
