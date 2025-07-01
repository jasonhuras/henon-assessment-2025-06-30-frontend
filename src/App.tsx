import React, { JSX, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createAppTheme } from './themes/theme';
import Dashboard from './pages/Dashboard/Dashboard';
import CurrencyConversion from './pages/CurrecyConversion/CurrencyConversion';

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = (): void => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const theme = createAppTheme(isDarkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
          />
          <Route
            path="/convert-currency"
            element={<CurrencyConversion toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;