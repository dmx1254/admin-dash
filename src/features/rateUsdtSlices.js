/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  usdtra: 1,
  idusdt: "",
};

export const usdtRateSlice = createSlice({
  name: "usdtra",
  initialState,
  reducers: {
    getUsdtRa: (state, action) => {
      state.usdtra = action.payload.usdt;
      state.idusdt = action.payload.idusdt;
      state.loading = false;
    },

    updateUsdt: (state, action) => {
      state.usdtra = action.payload.usdt;
    },
  },
});

export const { getUsdtRa, updateUsdt } = usdtRateSlice.actions;

export default usdtRateSlice.reducer;
