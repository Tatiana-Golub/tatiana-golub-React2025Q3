import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from '../context/ThemeContex';

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
