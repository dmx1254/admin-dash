/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  user: {},
  users: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
    updateUser: (state, action) => {
      state.user.person = action.payload;
    },

    getAllUsers: (state, action) => {
      state.users = action.payload;
    },

    deleteSingleUser: (state, action) => {
      state.users = state.users.filter(
        (singleUser) => singleUser._id !== action.payload.id
      );
    },
  },
});

export const {
  addUser,
  removeUser,
  updateUser,
  getAllUsers,
  deleteSingleUser,
} = userSlice.actions;

export default userSlice.reducer;
