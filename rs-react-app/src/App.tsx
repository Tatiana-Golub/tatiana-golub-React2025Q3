import { useCallback, useMemo, useState } from 'react';
import resource from './utils/dataSource';
import './App.css';
import { Country } from './types';
import { ColumnSelector } from './components/ColumnSelector';
import { VirtualizedList } from './components/VirtualizedList';

const App = () => {
  const data: Record<string, Country> = resource.read();

  const [year, setYear] = useState<number | undefined>(2020);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [columns, setColumns] = useState<string[]>([
    'population',
    'co2',
    'co2_per_capita',
  ]);

  const allColumns = useMemo(
    () => Object.keys(data['World']?.data[0] ?? {}),
    [data]
  );

  const allYears = useMemo(
    () =>
      Array.from(
        new Set(Object.values(data)[0]?.data.map((d) => d.year) ?? [])
      ).sort((a, b) => a - b),
    [data]
  );

  const toggleColumn = useCallback((col: string) => {
    setColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  }, []);

  const countries = useMemo(() => {
    let countriesList = Object.values(data).filter(
      (country): country is Country =>
        country !== undefined && typeof country.name === 'string'
    );

    if (search.trim()) {
      countriesList = countriesList.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'name') {
      countriesList = [...countriesList].sort((countryA, countryB) =>
        sortDir === 'asc'
          ? countryA.name.localeCompare(countryB.name)
          : countryB.name.localeCompare(countryA.name)
      );
    } else if (sortBy === 'population') {
      countriesList = [...countriesList].sort((countryA, countryB) => {
        const populationA =
          countryA.data.find((entry) => entry.year === year)?.population ?? 0;
        const populationB =
          countryB.data.find((entry) => entry.year === year)?.population ?? 0;

        return sortDir === 'asc'
          ? populationA - populationB
          : populationB - populationA;
      });
    }

    return countriesList;
  }, [data, sortBy, sortDir, search, year]);

  return (
    <div className="app">
      <h1 className="title">CO₂ Emissions Statistics</h1>

      <div className="controls">
        <select
          value={year ?? ''}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {allYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'population')}
        >
          <option value="name">Sort by Name</option>
          <option value="population">Sort by Population</option>
        </select>

        <select
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <ColumnSelector
          allColumns={allColumns}
          selected={columns}
          onChange={toggleColumn}
        />
      </div>

      <VirtualizedList
        countries={countries}
        year={year ?? 0}
        columns={columns}
      />
    </div>
  );
};

export default App;
