const fetchPlanets = async () => {
  const response = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
  console.log(response.results);
  return response.results;
};

export default fetchPlanets;
