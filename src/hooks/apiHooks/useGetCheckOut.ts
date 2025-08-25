import axios from "axios"
import { useEffect } from "react"
import { ORDER_API_END_POINT } from "../../utils/apiEndPoint"



const useGetCheckOut = ()=>{
      useEffect(()=>{
          const checkOut = async ()=>{
                try {
                     const res = axios.post(`${ORDER_API_END_POINT}/create-checkout-session` , {} , {withCredentials: true}) 
                     if(res.data.success){
                        
                     }
                } catch (error) {
                    console.log(error)
                }
          }
          checkOut()
      }, [])
}

export default useGetCheckOut