import { JSX } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { DynamicThemeProvider } from './themes/ThemeContext';
import CurrencyExchangeRates from './pages/CurrecyExchangeRates/CurrencyExchangeRates';
import Homepage from './pages/Homepage/Homepage';

function App(): JSX.Element {
  return (
    <DynamicThemeProvider>
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
    </DynamicThemeProvider>
  );
}

export default App;