import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-[90%] mx-auto'>
            <h2 className='text-5xl mt-18 text-center font-bold text-myColor opacity-50 pb-6 border-b-myColor border-b-2 rounded-3xl'>Orders Overview</h2>
              <div className='flex flex-wrap justify-center gap-5 mt-6'>
                  { [1,2,3].map((order : any , index: number)=>{
                    return <div key={index} className='p-4 h-96 w-92 shadow-xl rounded-xl border-t-6 border-myColor'>
                             <h2 className='text-2xl font-bold'>Shariyer Shazan</h2>
                             <p className='text-md font-bold my-2'>Food: <span className='text-sm font-medium'>Biriyani</span></p>
                             <p className='text-md font-bold my-2'>Address: <span className='text-sm font-medium'>Tejgaon Dhaka</span></p>
                             <p className='text-md font-bold my-2'>Total Amount: <span className='text-sm font-medium'>$120</span></p>
                             <img className='w-full h-32 rounded-lg my-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDZF9NXQ8SIL95juc21Rw7N5jb7hVkx_kjwlGtrwLs0la1hLrthJ9SokvlCadKuPBLPY&usqp=CAU" alt="" />
                            
                           <form className='mt-3' action="">
                              <label className='text-md font-bold mt-3' htmlFor="">Order Status:</label>
                                <br />
                                <select className='border-2 rounded-xl px-4 py-1 w-full border-myColor ' name="OrderStatus " id="">
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Preparing">Preparing</option>
                                  <option value="OutForDelivery">OutForDelivery</option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                           </form>
                         </div>
                   })}
              </div>
    </div>
  )
}

export default Dashboard
