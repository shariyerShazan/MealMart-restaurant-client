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
                        return <div key={index} className='p-4 h-88 w-72 shadow-xl rounded-xl border-t-6 border-myColor'>
                        <h2 className='text-2xl font-bold'>Shariyer Shazan</h2>
                        <p className='text-md font-bold my-2'>Food: <span className='text-sm font-medium'>Biriyani</span></p>
                        <p className='text-md font-bold my-2'>Address: <span className='text-sm font-medium'>Tejgaon Dhaka</span></p>
                        <p className='text-md font-bold my-2'>Total Amount: <span className='text-sm font-medium'>$120</span></p>
                        <img className='w-full h-32 rounded-lg my-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" alt="" />
                         <p className='text-2xl'>Order Status: <span className='text-myColor font-extrabold'>Confirm</span> </p>
                    </div>
                    })
                }
            </div>
    </div>
  )
}

export default UserOrder
