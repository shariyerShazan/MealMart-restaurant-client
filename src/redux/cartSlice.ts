import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
 _id: string;       
  foodName: string;    
  price: number;   
  description: string ; 
  quantity: number;  
  foodImage?: string;   
};

type CartState = {
    foods: CartItem[];
};

const initialState: CartState = {
  foods: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const food = state.foods.find((food) => food._id === action.payload._id);
      if (food) {
        food.quantity += 1; 
      } else {
        state.foods.push({ ...action.payload, quantity: 1 });
      }
    },


    increaseQuantity: (state, action: PayloadAction<string>) => {
      const food = state.foods.find((food) => food._id === action.payload);
      if (food) {
        food.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const food = state.foods.find((food) => food._id === action.payload);
      if (food && food.quantity > 1) {
        food.quantity -= 1;
      }
    },

    // Remove from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.foods = state.foods.filter((food) => food._id !== action.payload);
    },

    clearCart: (state) => {
      state.foods = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
