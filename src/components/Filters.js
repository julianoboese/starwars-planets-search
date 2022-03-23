import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { columns, setFilterByName, filterByNumericValues, setFilterByNumericValues,
    usedFilters, setUsedFilters } = useContext(PlanetsContext);
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const [currentNumericFilter, setCurrentNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const filteredColumns = filterByNumericValues.map(({ column }) => column);
    setUsedFilters(filteredColumns);
    setCurrentNumericFilter({
      column: columns.find((column) => !filteredColumns.includes(column)),
      comparison: 'maior que',
      value: 0,
    });
  }, [columns, filterByNumericValues, setUsedFilters]);

  const handleNumericFilterChange = ({ target }) => {
    setCurrentNumericFilter({ ...currentNumericFilter, [target.name]: target.value });
  };

  return (
    <>
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
            .map((column) => (
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
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
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
