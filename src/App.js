import { Box, createTheme, CssBaseline, Paper, Stack,
  ThemeProvider } from '@mui/material';
import React from 'react';
import NumericFilters from './components/NumericFilters';
import Order from './components/Order';
import DataTable from './components/DataTable';
import PlanetsProvider from './context/PlanetsProvider';
import Logo from './components/Logo';
import NameFilter from './components/NameFilter';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(255, 255, 0)',
    },
    secondary: {
      main: 'rgb(255, 0, 0)',
    },
  },
});

const filterAndSort = () => (
  <Stack direction="column" spacing={ 2 } alignItems="center">
    <NameFilter />
    <Stack
      direction="row"
      spacing={ 8 }
      justifyContent="center"
      alignItems="flex-end"
      sx={ { flexWrap: 'wrap' } }
    >
      <NumericFilters />
      <Order />
    </Stack>
  </Stack>
);

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <PlanetsProvider>
        <CssBaseline />
        <Logo />
        <Box
          sx={ { position: 'absolute',
            top: '100vh',
            minHeight: '100vh',
            minWidth: '100%',
            maxWidth: '100%',
            p: 8,
            pb: 4,
            bgcolor: 'black' } }
        >
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
