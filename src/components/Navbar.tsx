import { Grid, Typography, IconButton, useColorScheme, Box } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(): JSX.Element {
    const navigate = useNavigate();

    const { mode, setMode } = useColorScheme();

    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid >
                <Grid container spacing={20} alignItems="center">
                    <Grid >
                        <Typography variant="button" onClick={() => navigate('/')}
                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>Henon assessment</Typography>
                    </Grid>
                    <Grid >
                        <Typography
                            variant="button"
                            onClick={() => navigate('/convert-currency')}
                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                        >
                            Currency Converter
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid >
                <IconButton
                    onClick={toggleTheme}
                    sx={{
                        color: 'text.primary',
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    }}
                    aria-label="toggle theme"
                >
                    {mode === "dark" ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Grid>
        </Grid>
    );
}