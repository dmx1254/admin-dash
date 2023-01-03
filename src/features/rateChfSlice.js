/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  chfrate: 1,
  idchf: "",
};

export const chfRateSlice = createSlice({
  name: "chfrate",
  initialState,
  reducers: {
    getChfRate: (state, action) => {
      state.chfrate = action.payload.chf;
      state.idchf = action.payload.idchf;
      state.loading = false;
    },

    updateChf: (state, action) => {
      state.chfrate = action.payload.chf;
    },
  },
});

export const { getChfRate, updateChf } = chfRateSlice.actions;

export default chfRateSlice.reducer;
