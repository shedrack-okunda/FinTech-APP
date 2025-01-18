import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/AuthSlice";
import userSlice from "../features/user/UserSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
