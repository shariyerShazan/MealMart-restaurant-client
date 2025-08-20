import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant" ,
    initialState: {
        restaurant: null ,
        menu : [] ,
        allRestaurant : [] ,
        pagination: {}
    },
    reducers: {
        setRestaurant : (state , action)=>{
            state.restaurant = action.payload
        } ,
        setMenu : (state , action)=>{
            state.menu = action.payload
        },
        setAllRestaurant : (state , action)=>{
            state.allRestaurant = action.payload
        } ,
        setPagination : (state , action)=>{
            state.pagination = action.payload
        }
    }
})

export const {setRestaurant , setMenu ,setAllRestaurant , setPagination} = restaurantSlice.actions
export default restaurantSlice.reducer