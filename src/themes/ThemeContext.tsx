import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

interface ThemeContextType {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface DynamicThemeProviderProps {
    children: ReactNode;
}

const DEFAULT_PRIMARY_COLOR = '#99C33C';

export function DynamicThemeProvider({ children }: DynamicThemeProviderProps) {
    const [primaryColor, setPrimaryColorState] = useState(DEFAULT_PRIMARY_COLOR);

    //  saved color from localStorage on mount
    useEffect(() => {
        const savedColor = localStorage.getItem('theme-primary-color');
        if (savedColor) {
            setPrimaryColorState(savedColor);
        }
    }, []);

    const setPrimaryColor = (color: string) => {
        setPrimaryColorState(color);
        localStorage.setItem('theme-primary-color', color);
    };

    //  dynamic theme based on current primary color
    const theme = createTheme({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: primaryColor,
                    },
                    background: {
                        default: '#ffffff',
                        paper: '#ffffff',
                    },
                    text: {
                        primary: '#1a1a1a',
                        secondary: '#666666',
                    },
                    divider: '#e0e0e0',
                },
            },
            dark: {
                palette: {
                    primary: {
                        main: primaryColor,
                    },
                    background: {
                        default: '#0a0a0a',
                        paper: '#1a1a1a',
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#b0b0b0',
                    },
                    divider: '#333333',
                },
            },
        },
        typography: {
            fontFamily: '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
            },
            body1: {
                fontSize: '1rem',
                lineHeight: 1.6,
            },
        },
    });

    const contextValue: ThemeContextType = {
        primaryColor,
        setPrimaryColor,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeColor() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeColor must be used within a DynamicThemeProvider');
    }
    return context;
}