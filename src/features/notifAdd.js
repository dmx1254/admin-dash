/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  dataNotif: [],
};

export const notifSlice = createSlice({
  name: "dataNotif",
  initialState,

  reducers: {
    getNotifData: (state, action) => {
      state.dataNotif = action.payload;
      state.loading = false;
    },
  },
});

export const { getNotifData } = notifSlice.actions;

export default notifSlice.reducer;
