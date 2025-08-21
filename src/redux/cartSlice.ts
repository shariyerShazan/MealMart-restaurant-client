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
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const food = state.items.find((food) => food._id === action.payload._id);
      if (food) {
        food.quantity += 1; 
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },


    increaseQuantity: (state, action: PayloadAction<string>) => {
      const food = state.items.find((food) => food._id === action.payload);
      if (food) {
        food.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const food = state.items.find((food) => food._id === action.payload);
      if (food && food.quantity > 1) {
        food.quantity -= 1;
      }
    },

    // Remove from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((food) => food._id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
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
