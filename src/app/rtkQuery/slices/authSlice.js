import { createSlice } from "@reduxjs/toolkit";

// Ensure localStorage is only accessed on the client side
const getInitialAuthState = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && token != "undefined") return token;
  }
  return null; // Default state for SSR
};
const initialState = {
  token: getInitialAuthState(),
  user: null,
  isAuthenticated: getInitialAuthState() ? true : false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      //   state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("token", action.payload.accessToken);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

export default authSlice.reducer;
