import { CurrencyShortInterface } from "../types/currency.type";
import { TableCell, TableHeaderCell } from "../types/table.type";

export enum CurrencyColumnHeaders {
  Name = "Актив",
  Count = "Кол-во",
  Price = "Цена ($)",
  Value = "Общая стоимость",
  PriceChange = "Изменение (24ч)",
  PercentInPortfolio = "Доля (%)",
}

export const TABLE_HEADER_COLUMNS: TableHeaderCell[] = [
  { columnHeader: CurrencyColumnHeaders.Name, widthClass: "col-width-md" },
  { columnHeader: CurrencyColumnHeaders.Count, widthClass: "col-width-md" },
  { columnHeader: CurrencyColumnHeaders.Price, widthClass: "col-width-lg" },
  { columnHeader: CurrencyColumnHeaders.Value, widthClass: "col-width-lg" },
  {
    columnHeader: CurrencyColumnHeaders.PriceChange,
    widthClass: "col-width-md",
  },
  {
    columnHeader: CurrencyColumnHeaders.PercentInPortfolio,
    widthClass: "col-width-md",
  },
];

export const getRowData = (rawData: CurrencyShortInterface): TableCell[] => {
  const tableCells: TableCell[] = [
    {
      columnHeader: CurrencyColumnHeaders.Name,
      value: rawData.name.toUpperCase(),
      widthClass: "col-width-md",
      order: 0,
    },
    {
      columnHeader: CurrencyColumnHeaders.Count,
      value: String(rawData.count),
      widthClass: "col-width-md",
      order: 1,
    },
    {
      columnHeader: CurrencyColumnHeaders.Price,
      value: rawData.lastPrice,
      widthClass: "col-width-lg",
      order: 2,
    },
    {
      columnHeader: CurrencyColumnHeaders.Value,
      value: String(Number(rawData.lastPrice) * rawData.count),
      widthClass: "col-width-lg",
      order: 3,
    },
    {
      columnHeader: CurrencyColumnHeaders.PriceChange,
      value: rawData.priceChangePercent,
      widthClass: "col-width-md",
      order: 4,
    },
    {
      columnHeader: CurrencyColumnHeaders.PercentInPortfolio,
      value: String(rawData.percentInPortfolio),
      widthClass: "col-width-md",
      order: 5,
    },
  ];

  return tableCells;
};
