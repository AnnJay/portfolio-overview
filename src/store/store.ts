import { configureStore } from "@reduxjs/toolkit";

import allCurrencyReducer from "./reducers/allCurrencySlice";

export const store = configureStore({
  reducer: {
    allCurrency: allCurrencyReducer,
    // currencyVolume: currencyVolumeReducer,
    // userCurrency: userCurrencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
