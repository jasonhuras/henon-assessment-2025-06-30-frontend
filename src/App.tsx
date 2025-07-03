import { JSX } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './themes/theme';
import CurrencyExchangeRates from './pages/CurrecyExchangeRates/CurrencyExchangeRates';
import Homepage from './pages/Homepage/Homepage';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route
            path="/currency-exchange-rates"
            element={<CurrencyExchangeRates />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;