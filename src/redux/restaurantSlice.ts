import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant" ,
    initialState: {
        restaurant: null ,
        menu : []
    },
    reducers: {
        setRestaurant : (state , action)=>{
            state.restaurant = action.payload
        } ,
        setMenu : (state , action)=>{
            state.menu = action.payload
        }
    }
})

export const {setRestaurant , setMenu} = restaurantSlice.actions
export default restaurantSlice.reducer