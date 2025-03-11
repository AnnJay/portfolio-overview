import {
  CurrencyFullInterface,
  CurrencyShortInterface,
  NormalizedCurrencyRecords,
} from "../types/currency.type";

export const STABLE_COIN = "usdt";

export const filterCurrencyData = (data: CurrencyFullInterface[]) =>
  data.filter((item) => item.symbol.toLowerCase().includes(STABLE_COIN));

export const getCoinName = (symbol: string) =>
  symbol.toLowerCase().replace(STABLE_COIN, "");

export const shortenInitialRecord = (currency: CurrencyFullInterface) => {
  const newRecord: CurrencyShortInterface = {
    symbol: currency.symbol,
    name: getCoinName(currency.symbol),
    count: 0,
    lastPrice: currency.lastPrice,
    volume: 0,
    priceChangePercent: currency.priceChangePercent,
    percentInPortfolio: 0,
  };

  return newRecord;
};

export const normalizeCurrencyDataForStore = (
  data: CurrencyFullInterface[]
) => {
  const filteredData = filterCurrencyData(data);

  return filteredData.reduce<NormalizedCurrencyRecords>(
    (normalizedObject, currentItem) => {
      const key = getCoinName(currentItem.symbol);

      normalizedObject[key] = shortenInitialRecord(currentItem);

      return normalizedObject;
    },
    {}
  );
};

export const getGeneralCurrencyVolume = (data: CurrencyShortInterface[]) =>
  data.reduce<number>((acc, cur) => acc + Number(cur.lastPrice) * cur.count, 0);

export const getVolumePercentInPortfolio = (
  currencyVolume: number,
  record: CurrencyShortInterface
) => {
  const res =
    ((Number(record.lastPrice) * record.count) / currencyVolume) * 100;

  return `${res.toFixed(2)} %`;
};
