import { Box, createTheme, CssBaseline, Paper, Stack,
  ThemeProvider } from '@mui/material';
import React from 'react';
import Filters from './components/Filters';
import Order from './components/Order';
import DataTable from './components/DataTable';
import PlanetsProvider from './context/PlanetsProvider';
import Logo from './components/Logo';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255, 255, 0)' },
  },
});

const filterAndSort = () => (
  <Stack direction="row">
    <Filters />
    <Order />
  </Stack>
);

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <PlanetsProvider>
        <CssBaseline />
        <Box sx={ { minWidth: '100%', m: 0, p: 8, bgcolor: 'black' } }>
          <Logo />
          <Paper
            elevation={ 2 }
            sx={ { p: 2, bgcolor: 'rgb(30, 30, 30)', color: 'white' } }
          >
            {filterAndSort()}
            <DataTable />
          </Paper>
        </Box>
      </PlanetsProvider>
    </ThemeProvider>
  );
}

export default App;
