import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "./types/authTypes";

type Tstate = {
  accessToken: string | null;
  restToken: string | null;
  user: UserData | null;
};

const initialState: Tstate = {
  accessToken: null,
  restToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        console.error("Invalid payload received:", action.payload);
        return;
      }

      state.accessToken = action.payload;
    },
    addResetToken: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        console.error("Invalid payload received:", action.payload);
        return;
      }
      state.restToken = action.payload;
    },
    clearResetToken: (state) => {
      state.restToken = null;
    },

    addCurrentUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    removeCurrentUser: (state) => {
      state.user = null;
    },

    logout: (state) => {
      state.accessToken = null;
      state.restToken = null;
      state.user = null;
    },
  },
});

export const {
  setUser,
  addResetToken,
  clearResetToken,
  addCurrentUser,
  removeCurrentUser,
  logout,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
