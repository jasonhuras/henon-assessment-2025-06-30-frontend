import { JSX, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, Grid, Tabs, Tab, Button, Typography } from "@mui/material";
import CurrencyChart from "../../components/CurrencyChart";
import CurrencyGrid from "../../components/CurrencyGrid";
import CurrencySelectionDialog from "../../components/CurrencySelectionDialog";
import { ExchangeRateService } from "../../services/exchangeRateService";
import CurrencyData from "../../types/CurrencyData";

const timeframes = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '2Y'] as const;
type Timeframe = typeof timeframes[number];

export default function CurrencyConversion(): JSX.Element {
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
    const [availableCurrencies, setAvailableCurrencies] = useState<{ code: string; name: string; }[]>([]);
    const [availableCurrenciesLoading, setAvailableCurrenciesLoading] = useState(false);
    const [currencyDataLoading, setCurrencyDataLoading] = useState(false);
    const [currencyData, setCurrencyData] = useState<CurrencyData[]>([])
    const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1M');
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

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
            setInitialLoadComplete(true)
        }
    }, [availableCurrencies]);

    useEffect(() => {
        if (selectedCurrencies.length > 0) {
            loadCurrencyRatesData(selectedTimeframe);
        }
    }, [selectedTimeframe, initialLoadComplete]);

    useEffect(() => {
        const savedTab = localStorage.getItem('currency_tab_selection');
        if (savedTab !== null) {
            setTabValue(parseInt(savedTab));
        }
    }, []);

    const loadCurrencyRatesData = async (selectedTimeframe: Timeframe) => {
        setCurrencyDataLoading(true);
        try {
            const days = getTimeframeDays(selectedTimeframe);
            const currencyPromises = selectedCurrencies.map(currency =>
                ExchangeRateService.getExchangeRates({
                    base_currency_code: currency.slice(0, 3),
                    target_currency_code: currency.slice(-3),
                    start_date: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
                    end_date: new Date()
                })
            );

            const responses = await Promise.all([
                Promise.all(currencyPromises),
                new Promise(resolve => setTimeout(resolve, 250))
            ]);

            // Combine all currency data from responses
            const combinedCurrencyData = responses[0].flatMap(response => response.data);

            setCurrencyData(combinedCurrencyData);
            console.log(combinedCurrencyData)
        } catch (error) {
            console.error('Failed to fetch currency data:', error);
        } finally {
            setCurrencyDataLoading(false);
        }
    };

    const getTimeframeDays = (timeframe: Timeframe): number => {
        switch (timeframe) {
            case '1D': return 1;
            case '5D': return 5;
            case '1M': return 30;
            case '6M': return 180;
            case 'YTD': {
                const now = new Date();
                const startOfYear = new Date(now.getFullYear(), 0, 1);
                return Math.ceil((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
            }
            case '1Y': return 365;
            case '2Y': return 730;
            default: return 30;
        }
    };

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
        localStorage.setItem('currency_tab_selection', newValue.toString());
        setTabValue(newValue);
    };

    const handleDialogOpen = async () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        loadCurrencyRatesData(selectedTimeframe);
        setDialogOpen(false);
    };

    const handleTimeframeClick = (timeframe: Timeframe) => {
        setSelectedTimeframe(timeframe);
    };

    return (
        <Container>
            <Navbar />
            <Grid container direction="column" spacing={3}>
                <Grid>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ pb: 1 }} spacing={1}>
                        <Grid>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="currency data tabs">
                                <Tab label="Graph" />
                                <Tab label="Data Grid" />
                            </Tabs>
                        </Grid>
                        <Grid>
                            <Grid container spacing={3}>
                                {timeframes.map((label, index) => (
                                    <Grid>
                                        <Typography
                                            variant="overline"
                                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                                            onClick={() => handleTimeframeClick(label)}
                                        >
                                            {label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
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
                            <CurrencyChart currencyData={currencyData} loading={currencyDataLoading} setLoading={setCurrencyDataLoading} />
                        )}
                        {tabValue === 1 && (
                            <CurrencyGrid currencyData={currencyData} loading={currencyDataLoading} setLoading={setCurrencyDataLoading} />
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