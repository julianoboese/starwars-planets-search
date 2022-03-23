import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Table() {
  const { data, setData } = useContext(PlanetsContext);

  useEffect(() => {
    async function getPlanets() {
      const planets = await fetchPlanets();
      planets.forEach((planet) => delete planet.residents);
      setData(planets);
    }
    getPlanets();
  }, [setData]);

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
        {data.map((planet) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((item) => <td key={ item }>{item}</td>)}
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
