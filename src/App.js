import { Container, createTheme, Paper, Stack, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
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
  <Stack>
    <Filters />
    <Order />
  </Stack>
);

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <PlanetsProvider>
        <Container>
          <Logo />
          <Paper>
            {filterAndSort()}
            <DataTable />
          </Paper>
        </Container>
      </PlanetsProvider>
    </ThemeProvider>
  );
}

export default App;
