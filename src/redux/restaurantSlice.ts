// frontend/src/redux/restaurantSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Frontend types (mongoose type not needed here)
export interface IFrontendRestaurant {
  _id: string;
  owner?: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus?: any[]; 
  coverImage: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface RestaurantState {
  restaurant: IFrontendRestaurant | null;
  singleRestaurant: IFrontendRestaurant | null;
  menu: any[];
  allRestaurant: IFrontendRestaurant[];
  pagination: Pagination;
  orders: any[];
}

const initialState: RestaurantState = {
  restaurant: null,
  singleRestaurant: null,
  menu: [],
  allRestaurant: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  orders: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<IFrontendRestaurant | null>) => {
      state.restaurant = action.payload;
    },
    setMenu: (state, action: PayloadAction<any[]>) => {
      state.menu = action.payload;
    },
    setAllRestaurant: (state, action: PayloadAction<IFrontendRestaurant[]>) => {
      state.allRestaurant = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    setSingleRestaurant: (state, action: PayloadAction<IFrontendRestaurant | null>) => {
      state.singleRestaurant = action.payload;
    },
  },
});

export const {
  setRestaurant,
  setMenu,
  setAllRestaurant,
  setPagination,
  setOrders,
  setSingleRestaurant,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
