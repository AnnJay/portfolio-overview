import { axiosInstance } from "../../libs/axios";
import { normalizeCurrencyDataForStore } from "../../libs/utils";
import { CurrencyFullInterface } from "../../types/currency.type";
import { AppDispatch } from "../store";
import { allCurrencySlice } from "./allCurrencySlice";

export const fetchAllCurrency = () => async (dispatch: AppDispatch) => {
  const {
    allCurrencyFetching,
    allCurrencyFetchingSuccess,
    allCurrencyFetchingFailure,
  } = allCurrencySlice.actions;

  dispatch(allCurrencyFetching());

  axiosInstance
    .get<CurrencyFullInterface[]>("v3/ticker/24hr")
    .then(({ data }) =>
      dispatch(allCurrencyFetchingSuccess(normalizeCurrencyDataForStore(data)))
    )
    .catch((error) => dispatch(allCurrencyFetchingFailure(error.message)));
};
