import React, { JSX, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import Dashboard from './pages/Dashboard/Dashboard';
import CurrencyRates from './pages/CurrecyRates/CurrencyRates';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/convert-currency"
            element={<CurrencyRates />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;