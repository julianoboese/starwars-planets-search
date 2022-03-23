const fetchPlanets = async () => {
  const response = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
  return response.results;
};

export default fetchPlanets;
