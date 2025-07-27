import { useState, type ChangeEvent } from 'react';

interface SearchBarProps {
  input: string;
  onSearch: (input: string) => void;
}
function SearchBar({ input: initialInput, onSearch }: SearchBarProps) {
  const [input, setInput] = useState(initialInput);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onButtonClick = () => {
    const inputTrimmed = input.trim();
    onSearch(inputTrimmed);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for cats"
        value={input}
        onChange={onInputChange}
        onKeyDown={onEnterPress}
      />
      <button className="search-button" onClick={onButtonClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
