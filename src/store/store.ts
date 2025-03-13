import { configureStore } from "@reduxjs/toolkit";

import allCurrencyReducer from "./reducers/allCurrencySlice";
import userCurrencyReducer from "./reducers/userCurrencySlice";

export const store = configureStore({
  reducer: {
    allCurrency: allCurrencyReducer,
    userCurrency: userCurrencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
