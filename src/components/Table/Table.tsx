import { useAppSelector } from "../../hooks/redux";
import { getRowData, TABLE_HEADER_COLUMNS } from "../../libs/tables";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

import "./table.style.scss";

export const Table = () => {
  const { userCurrency } = useAppSelector((state) => state.userCurrency);

  return (
    <div className="width-100">
      <TableHeader headers={TABLE_HEADER_COLUMNS} />
      {userCurrency.map((currency) => (
        <TableRow key={currency.symbol} cells={getRowData(currency)} />
      ))}
    </div>
  );
};
