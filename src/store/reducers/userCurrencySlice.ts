import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyShortInterface } from "../../types/currency.type";
import {
  addCurrencyToLocalStorage,
  deleteCurrencyFromLocalStorage,
  getUserCurrencyFromStorage,
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
      state.userCurrency.push(action.payload);
      addCurrencyToLocalStorage(action.payload);
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
