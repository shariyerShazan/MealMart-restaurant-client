import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant" ,
    initialState: {
        restaurant: null ,
        singleRestaurant: null ,
        menu : [] ,
        allRestaurant : [] ,
        pagination: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0
          } ,
          orders: [] ,
          
        
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
        setOrders: (state , action)=>{
            state.orders = action.payload
        } ,
        setSingleRestaurant:(state , action)=>{
            state.singleRestaurant = action.payload
        } ,
        
    }
})

export const {setRestaurant , setMenu ,setAllRestaurant , setPagination ,
    setOrders , setSingleRestaurant
    } = restaurantSlice.actions
export default restaurantSlice.reducer