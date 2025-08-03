import type { Breed } from '../components/CardList';

export const convertToCSV = (selectedItemsIds: string[], items: Breed[]) => {
  const dataToWrite = filterData(selectedItemsIds, items);

  const csvContent = generateCsv(dataToWrite);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  return URL.createObjectURL(blob);
};

function filterData(selectedItemsIds: string[], items: Breed[]) {
  return items.filter((item) => selectedItemsIds.includes(item.id));
}

function generateCsv(dataToWrite: Breed[]) {
  const headers = ['ID', 'Name', 'Description'];
  const csv = [
    '\uFEFF',
    headers.map(escapeCsvValue).join(','),
    ...dataToWrite.map((item) =>
      [
        escapeCsvValue(item.id),
        escapeCsvValue(item.name),
        escapeCsvValue(item.description),
      ].join(',')
    ),
  ].join('\n');

  return csv;
}

function escapeCsvValue(value: string): string {
  const addQuotes = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');

  return addQuotes ? `"${escaped}"` : escaped;
}
