import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Table() {
  const { data, setData, filterByName, filterByNumericValues,
    filteredPlanets, setFilteredPlanets, order } = useContext(PlanetsContext);

  useEffect(() => {
    async function getPlanets() {
      const planets = await fetchPlanets();
      planets.forEach((planet) => delete planet.residents);
      setData(planets);
    }
    getPlanets();
  }, [setData]);

  useEffect(() => {
    const filteredData = data.filter((planet) => (
      filterByNumericValues.every((numericFilter) => {
        if (numericFilter.comparison === 'maior que') {
          return +planet[numericFilter.column] > +numericFilter.value;
        } if (numericFilter.comparison === 'menor que') {
          return +planet[numericFilter.column] < +numericFilter.value;
        }
        return +planet[numericFilter.column] === +numericFilter.value;
      })
    ));
    setFilteredPlanets(filteredData);
  }, [data, filterByNumericValues, setFilteredPlanets]);

  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];

  const renderedPlanets = filteredPlanets
    .filter((planet) => planet.name.toLowerCase().includes(filterByName.name))
    .sort((planetA, planetB) => planetA.name.localeCompare(planetB.name))
    .sort((planetA) => {
      const SORT_A_AFTER_B = 1;
      const SORT_A_BEFORE_B = -1;
      if (Number.isNaN(+planetA[order.column])) {
        return SORT_A_AFTER_B;
      }
      return SORT_A_BEFORE_B;
    })
    .sort((planetA, planetB) => (order.sort === 'ASC'
      ? planetA[order.column] - planetB[order.column]
      : planetB[order.column] - planetA[order.column]));

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => <th key={ header }>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {renderedPlanets
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((item, index) => (
                <td key={ item } data-testid={ index === 0 && 'planet-name' }>{item}</td>
              ))}
            </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
