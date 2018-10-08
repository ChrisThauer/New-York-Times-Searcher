import React from 'react';

import classes from './FilterBar.module.css';

const FilterBar = ({ sortBy, value, changeMinDate, changeMaxDate, maxDate, minDate, currentDate }) => {
  // Format date value to YYYY-MM-DD
  const formattedMaxDate = `${maxDate.slice(0, 4)}-${maxDate.slice(4,6)}-${maxDate.slice(6,8)}`;
  const formattedMinDate = `${minDate.slice(0, 4)}-${minDate.slice(4,6)}-${minDate.slice(6,8)}`;
  const formattedCurrentDate = `${currentDate.slice(0, 4)}-${currentDate.slice(4,6)}-${currentDate.slice(6,8)}`;

  return (
    <div className={classes.FilterBar}>
      <div>
        <label>Sort by: </label>
        <select value={value} onChange={sortBy}>
          <option></option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div>
        <label>Begin Date: </label>
        <input type="date" min="1851-09-18" max={formattedCurrentDate} onChange={changeMinDate} value={formattedMinDate} />
      </div>
      <div>
        <label>End Date: </label>
        <input type="date" min="1851-09-18" max={formattedCurrentDate} onChange={changeMaxDate} value={formattedMaxDate} />
      </div>
    </div>
  );
};

export default FilterBar;