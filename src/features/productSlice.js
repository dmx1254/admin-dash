/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  productDofus: [],
};

export const productSlice = createSlice({
  name: "productDofus",
  initialState,

  reducers: {
    getProducts: (state, action) => {
      state.productDofus = action.payload;
      state.loading = false;
    },

    addProduct: (state, action) => {
      state.productDofus.push(action.payload);
    },

    deleteProduct: (state, action) => {
      state.productDofus = state.productDofus.filter(
        (product) => product._id !== action.payload.id
      );
    },
  },
});

export const { getProducts, addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
