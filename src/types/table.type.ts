export interface TableHeaderCell {
  columnHeader: string;
  widthClass: string;
}

export interface TableCell extends TableHeaderCell {
  value: string;
  order?: number;
  renderValue?: (...args: any[]) => void;
}
