import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../src/context/ThemeContex';
import ThemeSelector from '../../src/components/ThemeSelector';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggle theme and update DOM and localStorage', async () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('darkMode')).toBe('on');

    await userEvent.click(button);

    await waitFor(() =>
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    );
    expect(localStorage.getItem('darkMode')).toBe('off');

    await userEvent.click(button);

    await waitFor(() =>
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    );
    expect(localStorage.getItem('darkMode')).toBe('on');
  });
});
