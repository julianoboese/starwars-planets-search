import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { setFilterByName,
    filterByNumericValues, setFilterByNumericValues } = useContext(PlanetsContext);
  const columns = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const [currentNumericFilter, setCurrentNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleNumericFilterChange = ({ target }) => {
    setCurrentNumericFilter({ ...currentNumericFilter, [target.name]: target.value });
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        setFilterByNumericValues([...filterByNumericValues, currentNumericFilter]);
      } }
    >
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        onChange={ ({ target }) => setFilterByName({ name: target.value.toLowerCase() }) }
      />
      <select
        data-testid="column-filter"
        value={ currentNumericFilter.column }
        name="column"
        onChange={ handleNumericFilterChange }
      >
        {columns.map((column) => (
          <option key={ column }>{column}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ currentNumericFilter.comparison }
        name="comparison"
        onChange={ handleNumericFilterChange }
      >
        {comparisons.map((comparison) => (
          <option key={ comparison }>{comparison}</option>
        ))}
      </select>
      <input
        type="number"
        value={ currentNumericFilter.value }
        data-testid="value-filter"
        name="value"
        onChange={ handleNumericFilterChange }
      />
      <button type="submit" data-testid="button-filter">Filtrar</button>
    </form>
  );
}

export default Filters;
