/* @ts-nocheck */
/* eslint-disable */
/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  soldeData: null,
};

export const soldeSlice = createSlice({
  name: "solde",
  initialState,

  reducers: {
    getSolde: (state, action) => {
      state.soldeData = action.payload;
      state.loading = false;
    },

    updateSolde: (state, action) => {
      state.soldeData = state.soldeData.map((solde) => {
        if (solde._id === action.payload._id) {
          return {
            ...solde,
            status: action.payload.status,
          };
        } else {
          return solde;
        }
      });
    },

    addOrderSolde: (state, action) => {
      state.soldeData.push(action.payload);
    },

    deleteSolde: (state, action) => {
      state.soldeData = state.soldeData.filter(
        (solde) => solde?._id !== action?.payload?.id
      );
    },
  },
});

export const { getSolde, updateSolde, addOrderSolde, deleteSolde } =
  soldeSlice.actions;

export default soldeSlice.reducer;
