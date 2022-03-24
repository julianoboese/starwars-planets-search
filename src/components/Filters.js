import { Button } from '@mui/material';
import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useRefreshFilters from '../hooks/useRefreshFilters';

function Filters() {
  const { columns, setFilterByName, filterByNumericValues, setFilterByNumericValues,
    usedFilters } = useContext(PlanetsContext);

  const [currentNumericFilter, setCurrentNumericFilter] = useRefreshFilters();

  const handleNumericFilterChange = ({ target }) => {
    setCurrentNumericFilter({ ...currentNumericFilter, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilterByNumericValues([...filterByNumericValues, currentNumericFilter]);
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          onChange={ ({ target }) => setFilterByName(
            { name: target.value.toLowerCase() },
          ) }
        />
        <select
          data-testid="column-filter"
          value={ currentNumericFilter.column }
          name="column"
          onChange={ handleNumericFilterChange }
        >
          {columns.filter((column) => !usedFilters.includes(column))
            .map((column) => (<option key={ column }>{column}</option>))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ currentNumericFilter.comparison }
          name="comparison"
          onChange={ handleNumericFilterChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          value={ currentNumericFilter.value }
          data-testid="value-filter"
          name="value"
          onChange={ handleNumericFilterChange }
        />
        <Button
          type="submit"
          variant="outlined"
          data-testid="button-filter"
        >
          Filtrar
        </Button>
      </form>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilterByNumericValues([]) }
      >
        Remover Filtros
      </button>
      <ul>
        {filterByNumericValues.map(({ column, comparison, value }) => (
          <li key={ column } data-testid="filter">
            <span>{`${column} ${comparison} ${value}`}</span>
            <button
              type="button"
              onClick={ () => setFilterByNumericValues(filterByNumericValues
                .filter((numericFilter) => numericFilter.column !== column)) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Filters;
