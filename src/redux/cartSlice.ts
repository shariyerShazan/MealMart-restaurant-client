import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Cart Item Type Define
export interface CartItem {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  foodImage?: string;
  quantity: number;
}

// Slice Initial State
interface CartState {
  foods: CartItem[];
}

const initialState: CartState = {
  foods: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to Cart
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      // safety check
      if (!state.foods) state.foods = [];

      const existingItem = state.foods.find((item) => item._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.foods.push({ ...action.payload, quantity: 1 });
      }
    },

    // Increase Quantity
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.foods.find((p) => p._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease Quantity
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.foods.find((p) => p._id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.foods = state.foods.filter((p) => p._id !== action.payload);
      }
    },

    // Delete From Cart
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.foods = state.foods.filter((p) => p._id !== action.payload);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.foods = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
