import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ORDER_API_END_POINT } from '../utils/apiEndPoint'

const UserOrder = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${ORDER_API_END_POINT}`, { withCredentials: true })
        if (res.data?.success) {
          setOrders(res.data.orders)
        } else {
          console.log(res.data.message)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <div className='h-[70vh] flex justify-center items-center text-3xl font-semibold text-myColor'>Loading...</div>
  }

  if (orders.length === 0) {
    return <div className='h-[70vh] flex justify-center items-center text-3xl font-semibold text-myColor'>No order found!</div>
  }

  return (
    <div className='min-h-[70vh] pt-22'>
      <h2 className='text-5xl text-myColor font-bold text-center opacity-50 pb-6 border-b-2 border-b-myColor rounded-xl'>Your Orders</h2>

      <div className='flex flex-wrap gap-5 mt-8 justify-center'>
        {orders.map((order, index) => (
          <div key={index} className='p-4 w-92 shadow-xl rounded-xl border-t-6 border-myColor'>
            <h2 className='text-2xl font-bold'>{order?.orderBy?.fullName}</h2>
            <p className='text-sm font-bold my-2'>Order summary:</p>
            {order.cartItems.map((item, idx) => (
              <div className='flex justify-between items-center gap-2 border-b-1 border-b-gray-400' key={idx}>
                <div className='flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-full object-cover my-3' src={item?.foodImage} alt="" />
                  <p className='font-semibold'>{item?.foodName}</p>
                </div>
                <p className='font-bold text-myColor text-right'>${item?.price}*{item?.quantity} = ${item?.quantity*item?.price}</p>
              </div>
            ))}
            <p className='text-sm font-bold flex justify-between mt-3'><span>Total Amount</span><span className='text-lg text-green-500'>${order.totalAmount}</span></p>
            <p className='text-2xl my-4'>Order Status: <span className='text-myColor font-extrabold'>{order?.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserOrder
