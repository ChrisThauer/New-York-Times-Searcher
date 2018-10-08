import React from 'react';

import classes from './SearchBar.module.css';

const SearchBar = ({ searchChange, searchSubmit, toggleFilter }) => {
  return (
    <div className={classes.SearchBar}>
      <form onSubmit={searchSubmit}>
        <input type="text" onChange={searchChange} placeholder="Enter search term here" />
        <button type="submit">Search</button>
        <button 
          type="button" 
          onClick={toggleFilter}
          className={classes.filter}>
            <i className="fas fa-filter"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;