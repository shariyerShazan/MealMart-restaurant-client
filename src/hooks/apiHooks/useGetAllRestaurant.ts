import axios from "axios"
import { useEffect } from "react"
import { RESTAURANT_API_END_POINT } from "../../utils/apiEndPoint"
import { setAllRestaurant, setPagination } from "../../redux/restaurantSlice"
import { useAppDispatch, useAppSelector } from "../useReduxTypeHooks"

const useGetAllRestaurant = ({ searchText = "", cuisines = "", dependency = "" }) => {
  const { pagination } = useAppSelector((state) => state.restaurant)
  const limit = pagination?.limit || 10; 
  const page = pagination?.page || 1;  

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchAllRestaurant = async () => {
      try {
        const res = await axios.get(
          `${RESTAURANT_API_END_POINT}/search?searchText=${searchText}&limit=${limit}&page=${page}`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setAllRestaurant(res.data.restaurants))
          dispatch(setPagination(res.data.pagination))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllRestaurant()
  }, [dispatch, dependency, limit, page, searchText, cuisines]) 
}

export default useGetAllRestaurant
