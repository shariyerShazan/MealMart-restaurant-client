// frontend/src/redux/userSlice.ts
import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

// User type for frontend
export interface IUser {
  fullName: string;
  email: string;
  contact: string;
  address?: string;
  city?: string;
  country?: string;
  profilePicture?: string;
  admin?: boolean;
}

// Slice state type
interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
