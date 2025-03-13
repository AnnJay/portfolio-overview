import { FC } from "react";

import { useAppSelector } from "../../hooks/redux";
import { CurrencyShortInterface } from "../../types/currency.type";
import { VirtualTableContainer } from "./VirtualTableContainer";
import { TableHeader } from "./TableHeader";
import { TABLE_HEADER_COLUMNS } from "../../libs/tables";
import { useWSConnection } from "../../hooks/useWSConnection";

import "./table.style.scss";

export const Table: FC = () => {
  const { userCurrency } = useAppSelector((state) => state.userCurrency);
  const data: CurrencyShortInterface[] = userCurrency;

  const { bufferedData } = useWSConnection();

  const updateTableWithSocketData = () => {
    const updatedCurrency: CurrencyShortInterface[] = [];

    userCurrency.forEach((cur) => {
      const recordIntTheBuffer = bufferedData.current[cur.name];

      if (recordIntTheBuffer)
        updatedCurrency.push({
          ...cur,
          lastPrice: recordIntTheBuffer.lastPrice,
          priceChangePercent: recordIntTheBuffer.priceChangePercent,
        });
    });
  };

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
