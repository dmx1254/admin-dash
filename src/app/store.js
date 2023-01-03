/* @ts-nocheck */
/* eslint-disable */

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import userReducer from "../features/userSlices";
import serversReducer from "../features/serverSlices";
import euroRateReducer from "../features/rateEuroSlice";
import dollarRateReducer from "../features/rateDollarSlices";
import usdtRaChangeReducer from "../features/rateUsdtSlices";
import cadReducer from "../features/rateCadSlice";
import chfReducer from "../features/rateChfSlice";
import rubReducer from "../features/rateRubSlice";
import orderListReducer from "../features/orderSlice";
import rateReducer from "../features/rateSlice";
import soldeReducer from "../features/soldesSlices";
import soldeHistoryReducer from "../features/dataSoldeSlice";
import orderReducer from "../features/ordersSlice";
import notifReducer from "../features/notifAdd";
import ProductDofusReducer from "../features/productSlice";
import gbpReducer from "../features/rateGbpSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducers = combineReducers({
  user: userReducer,
  servers: serversReducer,
  eurorate: euroRateReducer,
  usdtra: usdtRaChangeReducer,
  dollarate: dollarRateReducer,
  orderlist: orderListReducer,
  rate: rateReducer,
  solde: soldeReducer,
  soldes: soldeHistoryReducer,
  orders: orderReducer,
  dataNotif: notifReducer,
  cadrate: cadReducer,
  chfrate: chfReducer,
  rubrate: rubReducer,
  productDofus: ProductDofusReducer,
  gbprate: gbpReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "production",
});

export let persistor = persistStore(store);
