import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Table() {
  const { data, setData, filterByName, filterByNumericValues,
    filteredPlanets, setFilteredPlanets } = useContext(PlanetsContext);

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

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => <th key={ header }>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets
          .filter((planet) => planet.name.toLowerCase().includes(filterByName.name))
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((item) => <td key={ item }>{item}</td>)}
            </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
