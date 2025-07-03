import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    // Enable both light and dark color schemes
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#99C33C',
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
                    main: '#99C33C',
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
    }
});