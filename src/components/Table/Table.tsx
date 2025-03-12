import { FC } from "react";

import { useAppSelector } from "../../hooks/redux";
import { CurrencyShortInterface } from "../../types/currency.type";
import { VirtualTableContainer } from "./VirtualTableContainer";
import { TableHeader } from "./TableHeader";
import {TABLE_HEADER_COLUMNS } from "../../libs/tables";

import "./table.style.scss";

export const Table: FC = () => {
  const { userCurrency } = useAppSelector((state) => state.userCurrency);
  const data: CurrencyShortInterface[] = userCurrency;

  return (
    <div className="table__container">
      <TableHeader headers={TABLE_HEADER_COLUMNS} />
      <VirtualTableContainer
        data={data}
        itemHeight={40}
        containerHeight="80vh"
      />
    </div>
  );
};
