import classNames from "classnames";
import { FC } from "react";
import { TableCell } from "../../types/table.type";
import { CurrencyColumnHeaders } from "../../libs/tables";

interface TableRowProps {
  cells: TableCell[];
}

export const TableRow: FC<TableRowProps> = ({ cells }) => {
  return (
    <div className="table__row">
      {cells.map((cell) => (
        <div
          key={cell.columnHeader}
          className={classNames("table__cell", {
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
