import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant" ,
    initialState: {
        restaurant: null
    },
    reducers: {
        setRestaurant : (state , action)=>{
            state.restaurant = action.payload
        }
    }
})

export const {setRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer