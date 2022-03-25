import { useContext, useEffect } from 'react';
import { scroller } from 'react-scroll';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function useRenderedPlanets() {
  const { data, setData, filterByName, filterByNumericValues, filteredPlanets,
    setFilteredPlanets, order } = useContext(PlanetsContext);

  useEffect(() => {
    async function getPlanets() {
      const planets = await fetchPlanets();
      // https://www.w3schools.com/howto/howto_js_remove_property_object.asp
      planets.forEach((planet) => delete planet.residents);
      setData(planets);
    }
    getPlanets();

    // https://github.com/fisshy/react-scroll
    scroller.scrollTo('data-table', {
      duration: 1750,
      delay: 5000,
      smooth: 'easeInOutCubic',
    });
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

  const renderedPlanets = filteredPlanets
    .filter((planet) => planet.name.toLowerCase().includes(filterByName.name))
    // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
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

  return renderedPlanets;
}

export default useRenderedPlanets;
