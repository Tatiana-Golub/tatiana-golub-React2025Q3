import { NextResponse } from 'next/server';
import { Breed } from '../../../types';
import { generateCsv } from '../../../utils/utils';

export async function POST(request: Request) {
  const items = (await request.json()) as Breed[];
  const csvContent = generateCsv(items);

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="export.csv"',
    },
  });
}
