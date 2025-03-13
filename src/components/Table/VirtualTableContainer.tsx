import { useState, useEffect, useRef, useLayoutEffect, FC } from "react";

import { CurrencyShortInterface } from "../../types/currency.type";
import { TableRow } from "./TableRow";
import { getRowData } from "../../libs/tables";

import "./table.style.scss";

interface VirtualTableContainerProps {
  data: CurrencyShortInterface[];
  itemHeight: number;
  containerHeight: string;
}

export const VirtualTableContainer: FC<VirtualTableContainerProps> = ({
  data,
  itemHeight,
  containerHeight,
}) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = data.length * itemHeight;
  const visibleData = data.slice(startIndex, startIndex + visibleItemsCount);

  const paddingTop = startIndex * itemHeight;
  const paddingBottom =
    totalHeight - paddingTop - visibleData.length * itemHeight;

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      setStartIndex(newStartIndex);
    }
  };

  const calculateVisibleItemsCount = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const newVisibleItemsCount = Math.ceil(containerHeight / itemHeight);
      setVisibleItemsCount(newVisibleItemsCount);
    }
  };

  useLayoutEffect(() => {
    calculateVisibleItemsCount();

    const handleResize = () => {
      calculateVisibleItemsCount();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="virtual__container"
      style={{
        height: containerHeight,
        overflow: "auto",
      }}
    >
      <div
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
      >
        {visibleData.map((item, index) => (
          <TableRow key={index} cells={getRowData(item)} />
        ))}
      </div>
    </div>
  );
};
