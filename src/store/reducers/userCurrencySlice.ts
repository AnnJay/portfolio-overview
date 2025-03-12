import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyShortInterface } from "../../types/currency.type";
import { getGeneralCurrencyVolume } from "../../libs/utils";

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
    getRecordsFromLocalStorage(
      state,
      action: PayloadAction<CurrencyShortInterface[]>
    ) {
      state.userCurrency = action.payload;
    },

    addNewCurrency(state, action: PayloadAction<CurrencyShortInterface>) {
      state.userCurrency.push(action.payload);
    },

    deleteCurrency(state, action: PayloadAction<string>) {
      state.userCurrency = state.userCurrency.filter(
        (cur) => cur.name !== action.payload
      );
    },
  },
});

export default userCurrencySlice.reducer;
