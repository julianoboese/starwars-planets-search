import { Button, FormControl, FormControlLabel, InputLabel, NativeSelect,
  Radio, RadioGroup } from '@mui/material';
import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Order() {
  const { columns, setOrder } = useContext(PlanetsContext);

  const [currentOrder, setCurrentOrder] = useState({
    column: 'population',
    sort: '',
  });

  const handleOrderChange = ({ target }) => {
    setCurrentOrder({ ...currentOrder, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrder(currentOrder);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <FormControl variant="standard" sx={ { m: 1, minWidth: 120 } }>
        <InputLabel sx={ { color: 'rgba(255, 255, 255, 0.7)' } }>
          Ordenar
        </InputLabel>
        <NativeSelect
          sx={ { color: 'white' } }
          inputProps={ {
            name: 'column',
            value: currentOrder.column,
            'data-testid': 'column-sort',
            onChange: handleOrderChange,
          } }
        >
          {columns.map((column) => (
            <option
              key={ column }
              style={ { backgroundColor: 'black' } }
            >
              {column}
            </option>))}
        </NativeSelect>
      </FormControl>
      <FormControl>
        <RadioGroup
          name="sort"
          value={ currentOrder.sort }
          onChange={ handleOrderChange }
        >
          <FormControlLabel
            value="ASC"
            control={ <Radio /> }
            label="Ascendente"
            data-testid="column-sort-input-asc"
          />
          <FormControlLabel
            value="DESC"
            control={ <Radio /> }
            label="Descendente"
            data-testid="column-sort-input-desc"
          />
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
        data-testid="column-sort-button"
      >
        Ordenar
      </Button>
    </form>
  );
}

export default Order;
