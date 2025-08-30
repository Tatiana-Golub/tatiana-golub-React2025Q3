import { Country } from '../../types';
import './CountryTable.css';

interface Props {
  country: Country;
  columns: string[];
  year: number;
  rowHeight?: number;
  height?: number;
}

export const CountryTable = ({ country, columns, height=400 }: Props) => {
  const sortedData = [...country.data].sort((a, b) => a.year - b.year);

  return (
    <div
      className="country-table-container"
      style={{ maxHeight: height, overflowY: 'auto' }}
    >
      <table className="country-table">
        <thead>
          <tr>
            <th>Year</th>
            {columns.map((col) => (
              <th key={col}>{col.replace(/_/g, ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.year}>
              <td>{row.year}</td>
              {columns.map((col) => (
                <td key={col}>{row[col] ?? 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
