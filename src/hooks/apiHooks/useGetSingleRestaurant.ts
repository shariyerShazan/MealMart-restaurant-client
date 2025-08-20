import { useEffect, useState } from "react";
import axios from "axios";
import { RESTAURANT_API_END_POINT } from "../../utils/apiEndPoint";
import { useAppDispatch } from "../useReduxTypeHooks";
import { setRestaurant } from "../../redux/restaurantSlice";

const useGetSingleRestaurant = ({restaurantId = "", dependency = null}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!restaurantId) return;
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${RESTAURANT_API_END_POINT}/${restaurantId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setRestaurant(res.data.restaurant));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [dispatch , dependency]);

  return { loading, error };
};

export default useGetSingleRestaurant;
