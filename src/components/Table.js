import React from 'react';
import useRenderedPlanets from '../hooks/useRenderedPlanets';

function Table() {
  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];

  const renderedPlanets = useRenderedPlanets();

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
