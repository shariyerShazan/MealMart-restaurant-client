import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxTypeHooks'
import useGetRestOrders from '../../hooks/apiHooks/useGetRestOrders'
import axios from 'axios'
import { RESTAURANT_API_END_POINT } from '../../utils/apiEndPoint'
import { setOrders } from '../../redux/restaurantSlice'

const Dashboard = () => {
  const { orders } = useAppSelector((state) => state.restaurant)
  const [dependency, setDependency] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  useGetRestOrders({ dependency })

  useEffect(() => {
    setDependency(true)
  }, [dependency])

  // Status update handler
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
     const res = await axios.patch(`${RESTAURANT_API_END_POINT}/order/status/${orderId}`, 
        { status: newStatus }, 
        { withCredentials: true }
      )
     if(res.data.success){
      dispatch(setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: res.data.status } : order
      )))
      setDependency(true)
     }
    } catch (error) {
      console.error('Failed to update order status', error)
    }
  }

  if (orders?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-center text-xl font-bold text-myColor">No order Found</p>
      </div>
    )
  }

  return (
    <div className='w-[90%] mx-auto'>
      <h2 className='text-5xl mt-18 text-center font-bold text-myColor opacity-50 pb-6 border-b-myColor border-b-2 rounded-3xl'>Orders Overview</h2>
      <div className='flex flex-wrap justify-center gap-5 mt-6'>
        {orders?.map((order: any, index: number) => (
          <div key={index} className='p-4 w-92 shadow-xl rounded-xl border-t-6 border-myColor'>
            <h2 className='text-2xl font-bold'>{order?.orderBy?.fullName}</h2>
            <p className='text-md font-bold my-2'>Address: <span className='text-sm font-medium'>{order.deliveryInfo.address}</span></p>
            <p className='text-md font-bold my-2'>City: <span className='text-sm font-medium'>{order.deliveryInfo.city}</span></p>
            <p className='text-md font-bold my-2'>Total Amount: <span className='text-sm font-medium'>${order.totalAmount}</span></p>

            {order.cartItems.map((item: any, idx: number) => (
              <div className='flex justify-between items-center gap-2 border-b-1 border-b-gray-400' key={idx}>
                <div className='flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-full object-cover my-3' src={item?.foodImage} alt="" />
                  <p className='font-semibold'>{item?.foodName}</p>
                </div>
                <p className='font-bold text-myColor text-right'>${item?.price}*{item?.quantity} = ${item?.quantity*item?.price}</p>
              </div>
            ))}

            <form className='mt-3'>
              <label className='text-md font-bold mt-3' htmlFor="">Order Status:</label>
              <br />
              <select
                className='border-2 rounded-xl px-4 py-1 w-full border-myColor'
                value={order.status} 
                onChange={(e) => handleStatusChange(order._id, e.target.value)} 
              >
                {/* <option value="Pending">Pending</option> */}
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
