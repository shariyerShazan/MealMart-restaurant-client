// import axios from "axios"
// import { useEffect } from "react"
// import { RESTAURANT_API_END_POINT } from "../../utils/apiEndPoint"
// import { useAppDispatch } from "../useReduxTypeHooks"
// import { setAllCuisines } from "../../redux/userSlice"

// const useGetCuisines = ()=>{
//     const dispatch = useAppDispatch()
//     useEffect(()=>{
//         const  fetchCuisines = async ()=>{
//               try {
//                 const res = await axios.get(`${RESTAURANT_API_END_POINT}/cuisines` , {withCredentials: true})
//                 if(res.data.success){
//                     dispatch(setAllCuisines(res.data.cuisines))
//                 }
//               } catch (error) {
//                 console.log(error)
//               }
//         }
//         fetchCuisines()
//     },[dispatch ])
// }
// export default useGetCuisines