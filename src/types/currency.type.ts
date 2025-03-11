export interface CurrencyFullInterface {
  askPrice: string;
  askQty: string;
  bidPrice: string;
  bidQty: string;
  closeTime: number;
  count: number;
  firstId: number;
  highPrice: string;
  lastId: number;
  lastPrice: string;
  lastQty: string;
  lowPrice: string;
  openPrice: string;
  openTime: number;
  prevClosePrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  volume: string;
  weightedAvgPrice: string;
}

export interface CurrencyShortInterface {
  symbol: string;
  name: string;
  count: number;
  lastPrice: string;
  volume: number;
  priceChangePercent: string;
  percentInPortfolio: number;
}

export type NormalizedCurrencyRecords = Record<string, CurrencyShortInterface>;
