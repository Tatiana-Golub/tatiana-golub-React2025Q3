import { useState, type ChangeEvent } from 'react';
import styles from './SearchBar.module.css';
import type { SearchBarProps } from '../../types';

function SearchBar({ input: initialInput, onSearch }: SearchBarProps) {
  const [input, setInput] = useState(initialInput);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onButtonClick = () => {
    onSearch(input.trim());
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search for cats"
        value={input}
        onChange={onInputChange}
        onKeyDown={onEnterPress}
      />
      <button className={styles.searchButton} onClick={onButtonClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
