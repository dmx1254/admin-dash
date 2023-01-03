/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  orders: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    updateOrder: (state, action) => {
      state.orders = state.orders.map((order) => {
        if (order._id === action.payload._id) {
          return {
            ...order,
            status: action.payload.status,
            capture: action.payload.capture,
          };
        } else {
          return order;
        }
      });
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload.id
      );
    },

    addNewOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { getOrders, updateOrder, deleteOrder, addNewOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
