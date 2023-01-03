/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: null,
};

export const orderListSlice = createSlice({
  name: "orderlist",
  initialState,

  reducers: {
    getOrderList: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    updateOrderList: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return {
            ...product,
            status: action.payload.status,
          };
        } else {
          return product;
        }
      });
    },

    deleteOrderList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
    },
  },
});

export const { getOrderList, updateOrderList, deleteOrderList } =
  orderListSlice.actions;
export default orderListSlice.reducer;
