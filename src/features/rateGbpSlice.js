/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  gbprate: 1,
  idgbp: "",
};

export const GbpRateSlice = createSlice({
  name: "gbprate",
  initialState,

  reducers: {
    getGbpRate: (state, action) => {
      state.gbprate = action.payload.gbp;
      state.idgbp = action.payload.idgbp;
      state.loading = false;
    },

    updateGbp: (state, action) => {
      state.gbprate = action.payload.gbp;
    },
  },
});

export const { getGbpRate, updateGbp } = GbpRateSlice.actions;

export default GbpRateSlice.reducer;
