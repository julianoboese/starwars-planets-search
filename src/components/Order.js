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
      <select
        data-testid="column-sort"
        value={ currentOrder.column }
        name="column"
        onChange={ handleOrderChange }
      >
        {columns.map((column) => (<option key={ column }>{column}</option>))}
      </select>
      <label htmlFor="ASC">
        <input
          type="radio"
          name="sort"
          value="ASC"
          id="ASC"
          onChange={ handleOrderChange }
          data-testid="column-sort-input-asc"
        />
        Ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          name="sort"
          value="DESC"
          id="DESC"
          onChange={ handleOrderChange }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </label>
      <button type="submit" data-testid="column-sort-button">Ordenar</button>
    </form>
  );
}

export default Order;
