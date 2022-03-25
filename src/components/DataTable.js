import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell,
  styled, tableCellClasses } from '@mui/material';
import React from 'react';
import useRenderedPlanets from '../hooks/useRenderedPlanets';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function DataTable() {
  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];

  const renderedPlanets = useRenderedPlanets();

  return (
    <TableContainer component={ Paper } sx={ { maxHeight: 480 } }>
      <Table stickyHeader sx={ { minWidth: 700 } } aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell key={ header }>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedPlanets
            .map((planet) => (
              <StyledTableRow key={ planet.name }>
                {Object.values(planet).map((item, index) => (
                  <StyledTableCell
                    key={ item }
                    data-testid={ index === 0 && 'planet-name' }
                  >
                    {item}
                  </StyledTableCell>
                ))}
              </StyledTableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
