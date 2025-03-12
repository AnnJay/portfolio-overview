import { CurrencyShortInterface } from "../types/currency.type";

const LOCAL_STORAGE_USER_KEY = "user_currency";

export const updateStorage = (userCurrency: CurrencyShortInterface[]) => {
  const newRecord = JSON.stringify(userCurrency);
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, newRecord);
};

export const getUserCurrencyFromStorage = ():
  | CurrencyShortInterface[]
  | undefined => {
  const data = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  if (data) return JSON.parse(data) as CurrencyShortInterface[];
};

export const addCurrencyToLocalStorage = (currency: CurrencyShortInterface) => {
  const currentData = getUserCurrencyFromStorage();
  if (currentData) {
    const newData = [...currentData, currency];
    updateStorage(newData);
  }
};

export const deleteCurrencyFromLocalStorage = (name: string) => {
  const currentData = getUserCurrencyFromStorage();
  if (currentData) {
    const newData = currentData.filter(
      (currentData) => currentData.name !== name
    );
    updateStorage(newData);
  }
};
