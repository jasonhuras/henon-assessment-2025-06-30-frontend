import { CurrencyExchange, TuneRounded } from "@mui/icons-material";
import { Button, Chip, Paper, Typography } from "@mui/material";
import { JSX } from "react";

interface SelectCurrenciesButtonProps {
    length: number;
    loading: boolean;
    handleDialogOpen: () => void;
}

export default function SelectCurrenciesButton({ handleDialogOpen, length, loading }: SelectCurrenciesButtonProps): JSX.Element {
    return (<>
        {
            loading ? (
                <Paper
                    elevation={0}
                    sx={{
                        px: 2.5,
                        py: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        backgroundColor: 'action.hover',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'not-allowed',
                        opacity: 0.6
                    }
                    }
                >
                    <CurrencyExchange sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Loading currencies...
                    </Typography>
                </Paper >
            ) : (

                <Paper
                    elevation={0}
                    component={Button}
                    onClick={handleDialogOpen}
                    sx={{
                        px: 2.5,
                        py: 1.5,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            borderColor: 'primary.main',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(153, 195, 60, 0.25)',
                            '& .currency-icon': {
                                color: 'white'
                            },
                            '& .currency-text': {
                                color: 'white'
                            },
                            '& .currency-chip': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white'
                            }
                        }
                    }}
                >
                    <TuneRounded
                        className="currency-icon"
                        sx={{
                            fontSize: 18,
                            color: 'primary.main',
                            transition: 'color 0.2s ease'
                        }}
                    />
                    <Typography
                        className="currency-text"
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            transition: 'color 0.2s ease'
                        }}
                    >
                        Select Currencies
                    </Typography>
                    {length > 0 && (
                        <Chip
                            className="currency-chip"
                            label={length}
                            size="small"
                            sx={{
                                height: 20,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                backgroundColor: 'primary.main',
                                color: 'white',
                                transition: 'all 0.2s ease',
                                '& .MuiChip-label': {
                                    px: 1
                                }
                            }}
                        />
                    )}
                </Paper>
            )}</>
    );
}