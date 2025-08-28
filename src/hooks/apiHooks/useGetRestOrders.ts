import axios from "axios"
import { useEffect } from "react"
import { RESTAURANT_API_END_POINT } from "../../utils/apiEndPoint"
import { useAppDispatch } from "../useReduxTypeHooks"
import { setOrders } from "../../redux/restaurantSlice"


const useGetRestOrders = ({dependency = null}) => {
    const dispatch = useAppDispatch()
       useEffect(()=>{
            const fetchOrder =async ()=>{
                   try {
                    const res = await axios.get(`${RESTAURANT_API_END_POINT}/orders` , {withCredentials: true})
                    if(res.data.success){
                        dispatch(setOrders(res.data.orders))
                    }
                   } catch (error) {
                    console.log(error)
                   }
            }
            fetchOrder()
       }, [dispatch , dependency])
}

export default useGetRestOrders
