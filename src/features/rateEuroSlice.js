/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  eurorate: 1,
  ideuro: "",
};

export const euroRateSlice = createSlice({
  name: "eurorate",
  initialState,
  reducers: {
    getEuroRate: (state, action) => {
      state.eurorate = action.payload.euro;
      state.ideuro = action.payload.ideuro;
      state.loading = false;
    },

    updateEuro: (state, action) => {
      state.eurorate = action.payload.euro;
    },
  },
});

export const { getEuroRate, updateEuro } = euroRateSlice.actions;

export default euroRateSlice.reducer;
