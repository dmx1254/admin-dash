/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  rubrate: 1,
  idrub: "",
};

export const rubRateSlice = createSlice({
  name: "rubrate",
  initialState,
  reducers: {
    getRubRate: (state, action) => {
      state.rubrate = action.payload.rub;
      state.idrub = action.payload.idrub;
      state.loading = false;
    },

    updateRub: (state, action) => {
      state.rubrate = action.payload.rub;
    },
  },
});

export const { getRubRate, updateRub } = rubRateSlice.actions;

export default rubRateSlice.reducer;
