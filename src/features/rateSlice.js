/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  rate: 1,
  rateId: null,
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  rateId: "",

  reducers: {
    getRate: (state, action) => {
      state.rate = action.payload.rate;
      state.rateId = action.payload.idRate;
      state.loading = false;
    },

    updateRate: (state, action) => {
      state.rate = action.payload.rateUpdated;
    },
  },
});

export const { getRate, updateRate } = rateSlice.actions;

export default rateSlice.reducer;
