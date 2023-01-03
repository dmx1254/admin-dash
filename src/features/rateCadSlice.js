/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  cadrate: 1,
  idcad: "",
};

export const cadRateSlice = createSlice({
  name: "cadrate",
  initialState,
  reducers: {
    getCadRate: (state, action) => {
      state.cadrate = action.payload.cad;
      state.idcad = action.payload.idcad;
      state.loading = false;
    },

    updateCad: (state, action) => {
      state.cadrate = action.payload.cad;
    },
  },
});

export const { getCadRate, updateCad } = cadRateSlice.actions;

export default cadRateSlice.reducer;
