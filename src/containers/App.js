import React, { Component } from 'react';
import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import Article from '../components/Article/Article';
import FilterBar from '../components/FilterBar/FilterBar';

const API_KEY = '2c639f0b33c045f7906dffcfbb65dc1d';

class App extends Component {
  state = {
    searchTerm: '',
    articles: [],
    filter: false,
    sortBy: '',
    minDate: '18510918',
    maxDate: '18510918',
    currentDate: '18510918',
    error: false
  }

  componentDidMount() {
    // Converts current date to YYYYMMDD format
    const date = new Date().toISOString().replace(/-/gi, '').slice(0, 8);
    this.setState({ currentDate: date, maxDate: date });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit = (event) => {
    // Connects to the NY Times API and searches based on the input search term and returns 10 articles.
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&q=${this.state.searchTerm}`;
    if (this.state.minDate.length === 8) {
      url += `&begin_date=${this.state.minDate}`;
    }
    if (this.state.maxDate.length === 8) {
      url += `&end_date=${this.state.maxDate}`;
    }
    if (this.state.sortBy.length > 0) {
      url += `&sort=${this.state.sortBy}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ articles: data.response.docs });
      })
      .catch(err => {
        this.setState({ error: true });
      });
    event.preventDefault();
  }

  toggleFilter = () => {
    this.setState(prevState => ({ filter: !prevState.filter }));
  }

  onSortBy = (event) => {
    event.persist();
    this.setState({ sortBy: event.target.value }, () => this.onSearchSubmit(event));
  }

  onChangeMinDate = (event) => {
    event.persist();
    const date = event.target.value.replace(/-/gi, '');
    this.setState({ minDate: date }, () => this.onSearchSubmit(event));
  }

  onChangeMaxDate = (event) => {
    event.persist();
    const date = event.target.value.replace(/-/gi, '');
    this.setState({ maxDate: date }, () => this.onSearchSubmit(event));
  }

  render() {
    let articles = this.state.articles.map(article => {
      return article.type_of_material !== 'timestopic' ?
        <Article 
          key={article._id}
          webURL={article.web_url}
          headline={article.headline.main}
          snippet={article.snippet}
          type={article.type_of_material}
          pubDate={article.pub_date} />
      :
        null
    });

    if (articles.length === 0) {
      articles = <p>Please search for articles</p>
    }

    const error = <p>Error Loading Data</p>

    return (
      <div className="App">
        <h1>The New York Times Searcher</h1>
        <p>Search through the history of The New York Times by keyword</p>
        <SearchBar
          searchChange={this.onSearchChange}
          searchSubmit={this.onSearchSubmit}
          toggleFilter={this.toggleFilter} />
        {this.state.filter ? 
          <FilterBar
            maxDate={this.state.maxDate}
            minDate={this.state.minDate}
            currentDate={this.state.currentDate}
            sortBy={this.onSortBy} 
            value={this.state.sortBy}
            changeMinDate={this.onChangeMinDate}
            changeMaxDate={this.onChangeMaxDate} /> 
        : null}
        {this.state.error ? error : articles}
      </div>
    );
  }
}

export default App;
