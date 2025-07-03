import { JSX, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, Grid, Tabs, Tab, Button } from "@mui/material";
import CurrencyChart from "../../components/CurrencyChart";
import CurrencyGrid from "../../components/CurrencyGrid";
import CurrencySelectionDialog from "../../components/CurrencySelectionDialog";
import { ExchangeRateService } from "../../services/exchangeRateService";

export default function CurrencyConversion(): JSX.Element {
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
    const [availableCurrencies, setAvailableCurrencies] = useState<{ code: string; name: string; }[]>([]);
    const [availableCurrenciesLoading, setAvailableCurrenciesLoading] = useState(false);

    const [tabValue, setTabValue] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const loadAvailableCurrencies = async () => {
            setAvailableCurrenciesLoading(true);

            try {
                const [apiResponse] = await Promise.all([
                    ExchangeRateService.getSupportedCurrencies(),
                    new Promise(resolve => setTimeout(resolve, 250))
                ]);
                setAvailableCurrencies(apiResponse.data.pairs);
            } catch (error) {
                console.error('Failed to fetch supported currencies:', error);
            } finally {
                setAvailableCurrenciesLoading(false);
            }
        };

        loadAvailableCurrencies();
    }, []);

    useEffect(() => {
        if (availableCurrencies.length > 0) {
            const initialSelected = availableCurrencies
                .map(currency => currency.code)
                .filter(currencyCode =>
                    localStorage.getItem(`currency_${currencyCode}`) === 'true'
                );
            setSelectedCurrencies(initialSelected);
        }
    }, [availableCurrencies]);

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

    const handleDialogOpen = async () => {
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
                            {availableCurrenciesLoading ? (
                                <Button variant="outlined" size="small" disabled>
                                    Loading...
                                </Button>
                            ) : (
                                <Button variant="outlined" size="small" onClick={handleDialogOpen}>
                                    Select Currencies ({selectedCurrencies.length})
                                </Button>
                            )}
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

            <CurrencySelectionDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                currencies={availableCurrencies}
                selectedCurrencies={selectedCurrencies}
                onCurrencyToggle={handleCurrencyToggle}
            />
        </Container >
    );
}