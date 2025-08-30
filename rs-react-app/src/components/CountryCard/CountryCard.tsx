import { memo } from 'react';
import './CountryCard.css';
import { CountryTable } from '../CountryTable';
import { Country } from '../../types';

interface Props {
  country: Country;
  year: number;
  columns: string[];
  rowHeight?: number;
  height?: number;
}

export const CountryCard = memo(function CountryCard({
  country,
  year,
  columns,
  rowHeight = 32,
  height = 200,
}: Props) {
  const latestYear = Math.max(...country.data.map((yearData) => yearData.year));
  const latest = country.data.find((yearData) => yearData.year === latestYear);

  return (
    <div className="country-card">
      <h2>
        {country.name} ({country.iso_code ?? 'N/A'})
      </h2>
      <p>
        Population (latest, {latestYear}): {latest?.population ?? 'N/A'}
      </p>
      <CountryTable
        country={country}
        columns={columns}
        year={year}
        rowHeight={rowHeight}
        height={height}
      />
    </div>
  );
});
