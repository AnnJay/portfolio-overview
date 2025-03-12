import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyShortInterface } from "../../types/currency.type";
import {
  addCurrencyToLocalStorage,
  deleteCurrencyFromLocalStorage,
  getUserCurrencyFromStorage,
  mutateCurrencyInLocalStorage,
} from "../../libs/localStorage";

interface UserCurrency {
  userCurrency: CurrencyShortInterface[];
}

const initialState: UserCurrency = {
  userCurrency: [],
};

export const userCurrencySlice = createSlice({
  name: "userCurrency",
  initialState,
  reducers: {
    getRecordsFromLocalStorage(state) {
      const userCurrency = getUserCurrencyFromStorage();
      if (userCurrency) {
        state.userCurrency = userCurrency;
      } else {
        state.userCurrency = [];
      }
    },

    addNewCurrency(state, action: PayloadAction<CurrencyShortInterface>) {
      const existingCurrencyIndex = state.userCurrency.findIndex(
        (cur) => cur.name === action.payload.name
      );

      if (existingCurrencyIndex > -1) {
        const count =
          Number(action.payload.count) +
          Number(state.userCurrency[existingCurrencyIndex].count);

        state.userCurrency[existingCurrencyIndex] = {
          ...action.payload,
          count,
        };

        mutateCurrencyInLocalStorage(existingCurrencyIndex, {
          ...action.payload,
          count,
        });
      } else {
        state.userCurrency.push(action.payload);
        addCurrencyToLocalStorage(action.payload);
      }
    },

    deleteCurrency(state, action: PayloadAction<string>) {
      state.userCurrency = state.userCurrency.filter(
        (cur) => cur.name !== action.payload
      );
      deleteCurrencyFromLocalStorage(action.payload);
    },
  },
});

export default userCurrencySlice.reducer;
