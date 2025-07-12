import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CardList, { type Breed } from './components/CardList';

const API_URL = `https://api.thecatapi.com/v1/breeds`;
const API_KEY =
  'live_3CbgMb13ZFjtyL22iSqK3JakXhPppFZhgxM52h0cDrmKmGoOZ0s8HUbPRtyn3p6l';

interface AppState {
  searchItem: string;
  breeds: Breed[];
  loading: boolean;
  error: string | null;
}

interface AppProps {
  data: string;
}

class App extends Component<AppProps, AppState> {
  private limit: number = 5;
  private SEARCH_ITEM_KEY: string = 'searchItem';

  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchItem: '',
      breeds: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const savedTerm = this.loadSearchTerm();
    this.fetchData(savedTerm);
  }

  fetchData = (input: string) => {
    this.saveSearchTerm(input);

    let url = '';
    if (input === '') url = `${API_URL}?limit=${this.limit}&page=0`;
    else url = `${API_URL}/search?q=${input}`;

    this.setState({ loading: true, error: null });
    fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Breed[]) => {
        const filtered = input
          ? data.filter((breed, index) => {
              if (index < this.limit)
                return breed.name.toLowerCase().includes(input.toLowerCase());
            })
          : data;
        this.setState({ breeds: filtered, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  };

  loadSearchTerm(): string {
    return localStorage.getItem(this.SEARCH_ITEM_KEY) || '';
  }

  saveSearchTerm(term: string) {
    localStorage.setItem(this.SEARCH_ITEM_KEY, term);
  }

  render() {
    return (
      <div className="app">
        <h1>Breeds Cat-alog</h1>
        <SearchBar input={this.loadSearchTerm()} onSearch={this.fetchData} />
        <CardList data={this.state.breeds} />
      </div>
    );
  }
}

export default App;
