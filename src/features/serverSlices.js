/* @ts-nocheck */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  servers: null,
};

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    addServers: (state, action) => {
      state.loading = false;
      state.servers = action.payload;
    },

    deleteServer: (state, action) => {
      state.servers = state.servers.filter(
        (server) => server._id !== action.payload.id
      );
    },

    addServer: (state, action) => {
      state.servers.push(action.payload);
    },

    editServer: (state, action) => {
      state.servers = state.servers.map((server) => {
        if (server._id === action.payload._id) {
          return {
            ...server,
            serverName: action.payload.serverName,
            serverStatus: action.payload.serverStatus,
            serverPrice: action.payload.serverPrice,
            serverMinQty: action.payload.serverMinQty,
            serverCategory: action.payload.serverCategory,
          };
        } else {
          return server;
        }
      });
    },
  },
});

export const { addServers, deleteServer, addServer, editServer } =
  serversSlice.actions;

export default serversSlice.reducer;
