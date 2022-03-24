import { Button, FormControl, InputLabel, NativeSelect, Stack,
  TextField } from '@mui/material';
import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useRefreshFilters from '../hooks/useRefreshFilters';

function NumericFilters() {
  const { columns, filterByNumericValues, setFilterByNumericValues,
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
    <form onSubmit={ handleSubmit }>
      <Stack direction="row" spacing={ 2 } alignItems="center">
        <FormControl variant="standard" sx={ { m: 1, minWidth: 120 } }>
          <InputLabel>
            Coluna
          </InputLabel>
          <NativeSelect
            inputProps={ {
              name: 'column',
              value: currentNumericFilter.column,
              'data-testid': 'column-filter',
              onChange: handleNumericFilterChange,
            } }
          >
            {columns.filter((column) => !usedFilters.includes(column))
              .map((column) => (<option key={ column }>{column}</option>))}
          </NativeSelect>
        </FormControl>
        <FormControl variant="standard" sx={ { m: 1, minWidth: 120 } }>
          <InputLabel>
            Operador
          </InputLabel>
          <NativeSelect
            inputProps={ {
              name: 'comparison',
              value: currentNumericFilter.comparison,
              'data-testid': 'comparison-filter',
              onChange: handleNumericFilterChange,
            } }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </NativeSelect>
        </FormControl>
        <TextField
          type="number"
          value={ currentNumericFilter.value }
          name="value"
          onChange={ handleNumericFilterChange }
          inputProps={ { 'data-testid': 'value-filter' } }
          sx={ { maxWidth: '100px' } }
        />
        <Button
          type="submit"
          variant="outlined"
          data-testid="button-filter"
          sx={ { p: 1.75 } }
        >
          Filtrar
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          data-testid="button-remove-filters"
          sx={ { mx: 8, p: 1.75 } }
          onClick={ () => setFilterByNumericValues([]) }
        >
          Remover Filtros
        </Button>
      </Stack>
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
    </form>
  );
}

export default NumericFilters;
