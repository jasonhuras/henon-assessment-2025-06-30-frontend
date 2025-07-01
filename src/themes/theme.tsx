import { createTheme } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

export const createAppTheme = (mode: ThemeMode) => createTheme({
    palette: {
        mode,
        primary: {
            main: '#99C33C',
        },
        ...(mode === 'light'
            ? {
                // Light mode
                background: {
                    default: '#ffffff',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#1a1a1a',
                    secondary: '#666666',
                },
                divider: '#e0e0e0',
            }
            : {
                // Dark mode
                background: {
                    default: '#0a0a0a',
                    paper: '#1a1a1a',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#b0b0b0',
                },
                divider: '#333333',
            }),
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
    spacing: 8,
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: mode === 'light'
                        ? '0 1px 3px rgba(0,0,0,0.08)'
                        : '0 1px 3px rgba(255,255,255,0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});