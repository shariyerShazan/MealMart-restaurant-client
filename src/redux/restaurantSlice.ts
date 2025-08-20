import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant" ,
    initialState: {
        restaurant: null ,
        menu : [] ,
        allRestaurant : [] ,
        pagination: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0
          } ,
        //  adminMenu : []
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
        } ,
        // setAdminMenu: (state , action)=>{
        //     state.adminMenu = action.payload
        // }
    }
})

export const {setRestaurant , setMenu ,setAllRestaurant , setPagination ,
    //  setAdminMenu
    } = restaurantSlice.actions
export default restaurantSlice.reducer