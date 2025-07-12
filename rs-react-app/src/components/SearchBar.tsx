import { Component, type ChangeEvent } from 'react';

interface SearchBarProps {
  input: string;
  onSearch: (input: string) => void;
}

interface SearchState {
  input: string;
}

class SearchBar extends Component<SearchBarProps, SearchState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      input: props.input,
    };
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  onButtonClick = () => {
    const inputTrimmed = this.state.input.trim();
    this.props.onSearch(inputTrimmed);
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search for cats"
          value={this.state.input}
          onChange={this.onInputChange}
        />
        <button className="search-button" onClick={this.onButtonClick}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
