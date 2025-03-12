import classNames from "classnames";
import { FC } from "react";
import { TableCell } from "../../types/table.type";
import { CurrencyColumnHeaders } from "../../libs/tables";
import { useAppDispatch } from "../../hooks/redux";
import { userCurrencySlice } from "../../store/reducers/userCurrencySlice";

interface TableRowProps {
  cells: TableCell[];
}

export const TableRow: FC<TableRowProps> = ({ cells }) => {
  const dispatch = useAppDispatch();
  const { deleteCurrency, refreshTableStatistics } = userCurrencySlice.actions;

  const handleDeleteCurrency = () => {
    const name = cells
      .find((cell) => cell.columnHeader === CurrencyColumnHeaders.Name)
      ?.value.toLowerCase();

    if (name) {
      dispatch(deleteCurrency(name));
      dispatch(refreshTableStatistics());
    }
  };

  return (
    <div
      className="table__row border-bottom-primary--light"
      onClick={handleDeleteCurrency}
    >
      {cells.map((cell) => (
        <div
          key={cell.columnHeader}
          className={classNames("table__cell", cell.widthClass, {
            "table__cell--value-up":
              cell.columnHeader === CurrencyColumnHeaders.PriceChange &&
              Number(cell.value) >= 0,
            "table__cell--value-down":
              cell.columnHeader === CurrencyColumnHeaders.PriceChange &&
              Number(cell.value) < 0,
          })}
        >
          {cell.value}
        </div>
      ))}
    </div>
  );
};
