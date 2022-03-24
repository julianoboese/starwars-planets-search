import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const INITIAL_FILTER = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function useRefreshFilters() {
  const { columns, filterByNumericValues, setUsedFilters } = useContext(PlanetsContext);
  const [currentNumericFilter, setCurrentNumericFilter] = useState(INITIAL_FILTER);

  useEffect(() => {
    const filteredColumns = filterByNumericValues.map(({ column }) => column);
    setUsedFilters(filteredColumns);
    setCurrentNumericFilter({
      ...INITIAL_FILTER,
      column: columns.find((column) => !filteredColumns.includes(column)),
    });
  }, [columns, filterByNumericValues, setUsedFilters]);

  return [currentNumericFilter, setCurrentNumericFilter];
}

export default useRefreshFilters;
