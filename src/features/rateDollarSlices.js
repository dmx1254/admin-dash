/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  dollarate: 1,
  iddollar: "",
};

export const dollarRateSlice = createSlice({
  name: "dollarate",
  initialState,

  reducers: {
    getDollarRate: (state, action) => {
      state.dollarate = action.payload.dollar;
      state.iddollar = action.payload.iddollar;
      state.loading = false;
    },

    updateDollar: (state, action) => {
      state.dollarate = action.payload.dollar;
    },
  },
});

export const { getDollarRate, updateDollar } = dollarRateSlice.actions;

export default dollarRateSlice.reducer;
