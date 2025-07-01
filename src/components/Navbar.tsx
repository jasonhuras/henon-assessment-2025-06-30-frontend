import { Grid, Typography, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarProps from '../types/NavbarPropts';

export default function Navbar({ toggleTheme, isDarkMode }: NavbarProps): JSX.Element {
    const navigate = useNavigate();

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
                    color="inherit"
                    aria-label="toggle theme"
                >
                    {isDarkMode ? <DarkMode /> : <LightMode />}
                </IconButton>
            </Grid>
        </Grid>
    );
}