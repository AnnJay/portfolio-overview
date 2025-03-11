import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NormalizedCurrencyRecords } from "../../types/currency.type";

interface AllCurrency {
  allCurrency: NormalizedCurrencyRecords;
  isLoading: boolean;
  error: string;
}

const initialState: AllCurrency = {
  allCurrency: {},
  isLoading: false,
  error: "",
};

export const allCurrencySlice = createSlice({
  name: "allCurrency",
  initialState,
  reducers: {
    allCurrencyFetching(state) {
      state.isLoading = true;
    },
    allCurrencyFetchingSuccess(
      state,
      action: PayloadAction<NormalizedCurrencyRecords>
    ) {
      state.isLoading = false;
      state.error = "";
      state.allCurrency = action.payload;
    },
    allCurrencyFetchingFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default allCurrencySlice.reducer;
