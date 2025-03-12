import classNames from "classnames";
import { FC } from "react";

import { TableHeaderCell } from "../../types/table.type";

interface TableHeaderProps {
  headers: TableHeaderCell[];
}

export const TableHeader: FC<TableHeaderProps> = ({ headers }) => {
  return (
    <div className={classNames("table__header", "border-bottom-primary")}>
      {headers.map((header) => (
        <div
          key={header.columnHeader}
          className={classNames("table__column-header", header.widthClass)}
        >
          {header.columnHeader}
        </div>
      ))}
    </div>
  );
};
