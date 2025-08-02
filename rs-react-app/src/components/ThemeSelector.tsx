import { DARK_THEME_ICON, LIGHT_THEME_ICON } from '../constants';
import { useTheme } from '../hooks/useTheme';

function ThemeSelector() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {darkMode ? DARK_THEME_ICON : LIGHT_THEME_ICON}
    </button>
  );
}

export default ThemeSelector;
