/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  soldes: null,
};

export const soldeHistorySlice = createSlice({
  name: "soldes",
  initialState,
  reducers: {
    getSoldeHistory: (state, action) => {
      state.soldes = action.payload;
      state.loading = false;
    },

    updateHistorySolde: (state, action) => {
      state.soldes = state.soldes.map((solde) => {
        if (solde?._id === action.payload?._id) {
          return {
            ...solde,
            priceDh: action.payload.priceDh,
            status: action.payload.status,
          };
        } else return solde;
      });
    },

    deleteSoldeHistory: (state, action) => {
      state.soldes = state.soldes.filter(
        (solde) => solde?._id !== action?.payload?.id
      );
    },

    addNewSolde: (state, action) => {
      state.soldes.push(action.payload);
    },
  },
});

export const {
  getSoldeHistory,
  updateHistorySolde,
  deleteSoldeHistory,
  addNewSolde,
} = soldeHistorySlice.actions;

export default soldeHistorySlice.reducer;
