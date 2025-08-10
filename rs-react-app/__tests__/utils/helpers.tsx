import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsCard from '../../src/components/DetailsCard';
import { render } from '@testing-library/react';

export function renderDetailsCard() {
  return render(
    <MemoryRouter initialEntries={['/catalog/1/abys']}>
      <Routes>
        <Route path="/catalog/:page/:id" element={<DetailsCard />} />
      </Routes>
    </MemoryRouter>
  );
}
