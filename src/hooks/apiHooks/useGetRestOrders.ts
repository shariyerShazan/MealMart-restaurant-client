import axios from "axios";
import { useEffect, useState } from "react";
import { RESTAURANT_API_END_POINT } from "../../utils/apiEndPoint";
import { useAppDispatch } from "../useReduxTypeHooks";
import { setOrders } from "../../redux/restaurantSlice";

const useGetRestOrders = ({ dependency = null }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${RESTAURANT_API_END_POINT}/orders`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setOrders(res.data.orders));
        } else {
          setError(res.data.message || "Something went wrong");
        }
      } catch (err: any) {
        console.log(err);
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [dispatch, dependency]);

  return { loading, error };
};

export default useGetRestOrders;
