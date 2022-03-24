import React, { useContext } from 'react';
import { TextField } from '@mui/material';
import PlanetsContext from '../context/PlanetsContext';

function NameFilter() {
  const { setFilterByName } = useContext(PlanetsContext);
  return (
    <TextField
      label="Name"
      type="text"
      name="name"
      onChange={ ({ target }) => setFilterByName(
        { name: target.value.toLowerCase() },
      ) }
      inputProps={ { 'data-testid': 'name-filter' } }
    />
  );
}

export default NameFilter;
