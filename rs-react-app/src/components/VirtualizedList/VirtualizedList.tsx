import React, { useRef, useCallback, useMemo, memo } from 'react';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { Country } from '../../types';
import { CountryCard } from '../CountryCard';

interface VirtualizedProps {
  countries: Country[];
  year: number;
  columns: string[];
  tableRowHeight?: number;
  tableHeight?: number;
}

interface RowData {
  countries: Country[];
  year: number;
  columns: string[];
  rowHeight: number;
  tableHeight: number;
}

const COUNTRY_CARDS_SPACING = 30;

const Row = memo(function Row({
  index,
  style,
  data,
}: ListChildComponentProps<RowData>) {
  const { countries, year, columns, rowHeight, tableHeight } = data;
  const country = countries[index];

  return (
    <div style={{ ...style, paddingBottom: COUNTRY_CARDS_SPACING }}>
      <CountryCard
        country={country}
        year={year}
        columns={columns}
        rowHeight={rowHeight}
        height={tableHeight}
      />
    </div>
  );
});

export const VirtualizedList: React.FC<VirtualizedProps> = ({
  countries,
  year,
  columns,
  tableRowHeight: rowHeight = 32,
  tableHeight = 300,
}) => {
  const listRef = useRef<VariableSizeList>(null);

  const getItemSize = useCallback(
    (index: number) => {
      const country = countries[index];
      const headerHeight = 60;
      const dynamicTableHeight = Math.min(
        country.data.length * rowHeight,
        tableHeight
      );
      return headerHeight + dynamicTableHeight + COUNTRY_CARDS_SPACING;
    },
    [countries, rowHeight, tableHeight]
  );

  const itemData = useMemo(
    () => ({ countries, year, columns, rowHeight, tableHeight }),
    [countries, year, columns, rowHeight, tableHeight]
  );

  return (
    <VariableSizeList
      ref={listRef}
      height={900}
      itemCount={countries.length}
      itemSize={getItemSize}
      width="100%"
      itemData={itemData}
      overscanCount={3}
    >
      {Row}
    </VariableSizeList>
  );
};
