import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  r_token: localStorage.getItem("r_token") || "",
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    storeToken: (state, actions) => {
      state.token = "asdf";
      state.r_token = "asdf";
      localStorage.setItem("token", "asdf");
      localStorage.setItem("r_token", "asdf");
    },
    logOut: (state) => {
      state.token = "";
      state.r_token = "";
      localStorage.clear();
    },
  },
});

export const userReducer = userSlice.reducer;
export const UserActions = userSlice.actions;
