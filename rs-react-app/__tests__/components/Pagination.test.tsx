import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event';
import Pagination from '../../src/components/Pagination';

describe('Pagination', () => {
  it('call onNextPageClick when Next button is clicked', async () => {
    const onNextPageClick = vi.fn();
    const onPrevPageClick = vi.fn();

    render(
      <Pagination
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 1, total: 3 }}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    expect(onNextPageClick).toBeCalledTimes(1);
  });

  it('call onPrevPageClick when Prev button is clicked', async () => {
    const onNextPageClick = vi.fn();
    const onPrevPageClick = vi.fn();

    render(
      <Pagination
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 2, total: 3 }}
      />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    await userEvent.click(prevButton);
    expect(onPrevPageClick).toBeCalledTimes(1);
  });

  it('disable Prev button when disable.left is true', () => {
    render(
      <Pagination
        onNextPageClick={() => {}}
        onPrevPageClick={() => {}}
        disable={{ left: true, right: false }}
        nav={{ current: 1, total: 3 }}
      />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('render navigation info properly', () => {
    render(
      <Pagination
        onNextPageClick={() => {}}
        onPrevPageClick={() => {}}
        disable={{ left: false, right: false }}
        nav={{ current: 2, total: 3 }}
      />
    );

    const navInfo = screen.getByText('2 / 3');
    expect(navInfo).toBeInTheDocument();
  });
});
