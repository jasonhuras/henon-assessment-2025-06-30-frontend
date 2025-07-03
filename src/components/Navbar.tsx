import { Grid, Typography, IconButton, useColorScheme, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorWheel from './ColorWheel';

export default function Navbar(): JSX.Element {
    const navigate = useNavigate();

    const { mode, setMode } = useColorScheme();

    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                    variant="h6"
                >
                    Henon Assessment
                </Typography>
            </Grid>
            <Grid size={{ xs: 10, md: 6 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid>
                        <Typography
                            variant="button"
                            onClick={() => navigate('/')}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { opacity: 0.7 },
                                textTransform: 'none',
                                fontWeight: 500
                            }}
                        >
                            Home
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography
                            variant="button"
                            onClick={() => navigate('/currency-exchange-rates')}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { opacity: 0.7 },
                                textTransform: 'none',
                                fontWeight: 500
                            }}
                        >
                            Currency Exchange Rates
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={{ xs: 2, md: 2 }}>
                <Grid container spacing={0.5} justifyContent="flex-end">
                    <Grid>
                        <ColorWheel />
                    </Grid>
                    <Grid>
                        <Tooltip title="Switch dark/light mode" arrow>
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
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}