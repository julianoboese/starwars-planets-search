import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [columns] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [usedFilters, setUsedFilters] = useState([]);
  const [order, setOrder] = useState({});

  const context = {
    data,
    setData,
    columns,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    filteredPlanets,
    setFilteredPlanets,
    usedFilters,
    setUsedFilters,
    order,
    setOrder,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
