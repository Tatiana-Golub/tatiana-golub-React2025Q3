import { DARK_THEME_ICON, LIGHT_THEME_ICON } from './constants';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSelector.module.css';

function ThemeSelector() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <button
      className={styles.themeToggleButton}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {darkMode ? DARK_THEME_ICON : LIGHT_THEME_ICON}
    </button>
  );
}

export default ThemeSelector;
