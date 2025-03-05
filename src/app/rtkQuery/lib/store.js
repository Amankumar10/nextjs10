import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
