import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyShortInterface } from "../../types/currency.type";
import {
  addCurrencyToLocalStorage,
  deleteCurrencyFromLocalStorage,
  getUserCurrencyFromStorage,
  mutateCurrencyInLocalStorage,
  updateStorage,
} from "../../libs/localStorage";
import { getGeneralCurrencyVolume } from "../../libs/utils";

interface UserCurrency {
  userCurrency: CurrencyShortInterface[];
}

const initialState: UserCurrency = {
  userCurrency: getUserCurrencyFromStorage() || [],
};

export const userCurrencySlice = createSlice({
  name: "userCurrency",
  initialState,
  reducers: {
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

    refreshTableStatistics(state) {
      const oldData = state.userCurrency;

      const generalCurrencyVolume = getGeneralCurrencyVolume(oldData);

      const newData = oldData.map((cur) => {
        const volume: number = Number(cur.lastPrice) * cur.count;
        const percentInPortfolio = (volume / generalCurrencyVolume) * 100;

        return { ...cur, volume, percentInPortfolio };
      });

      state.userCurrency = newData;
      updateStorage(newData);
    },
  },
});

export default userCurrencySlice.reducer;
