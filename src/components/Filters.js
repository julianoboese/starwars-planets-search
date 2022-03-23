import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { setFilterByName } = useContext(PlanetsContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      name="name"
      onChange={ ({ target }) => setFilterByName({ name: target.value.toLowerCase() }) }
    />
  );
}

export default Filters;
