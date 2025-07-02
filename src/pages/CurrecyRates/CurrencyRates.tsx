import { JSX, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, Grid, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import CurrencyChart from "../../components/CurrencyChart";
import CurrencyGrid from "../../components/CurrencyGrid";

export default function CurrencyConversion(): JSX.Element {
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
    const [tabValue, setTabValue] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    const availableCurrencies = ['EUR/USD', 'EUR/CAD', 'USD/CAD', 'USD/EUR', 'CAD/USD', 'CAD/EUR'];

    // Initialize selected currencies from localStorage on mount
    useEffect(() => {
        const initialSelected = availableCurrencies.filter(currency =>
            localStorage.getItem(`currency_${currency}`) === 'true'
        );
        setSelectedCurrencies(initialSelected);
    }, []);

    const handleCurrencyToggle = (currencyCode: string, isSelected: boolean) => {
        setSelectedCurrencies(prev => {
            if (isSelected) {
                return prev.includes(currencyCode) ? prev : [...prev, currencyCode];
            } else {
                return prev.filter(currency => currency !== currencyCode);
            }
        });
        localStorage.setItem(`currency_${currencyCode}`, isSelected.toString());
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    return (
        <Container>
            <Navbar />
            <Grid container direction="column" spacing={3}>
                <Grid>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ pb: 1 }}>
                        <Grid>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="currency data tabs">
                                <Tab label="Graph" />
                                <Tab label="Data Grid" />
                            </Tabs>
                        </Grid>
                        <Grid>
                            <Button variant="outlined" size="small" onClick={handleDialogOpen}>
                                Select Currencies ({selectedCurrencies.length})
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid sx={{ mt: 2 }}>
                        {tabValue === 0 && (
                            <CurrencyChart selectedCurrencies={selectedCurrencies} />
                        )}
                        {tabValue === 1 && (
                            <CurrencyGrid selectedCurrencies={selectedCurrencies} />
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Select Currencies</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {availableCurrencies.map((currency) => (
                            <FormControlLabel
                                key={currency}
                                control={
                                    <Checkbox
                                        checked={selectedCurrencies.includes(currency)}
                                        onChange={(event) => handleCurrencyToggle(currency, event.target.checked)}
                                    />
                                }
                                label={currency}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}