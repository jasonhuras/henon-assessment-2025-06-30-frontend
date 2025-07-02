import { JSX, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, Grid } from "@mui/material";
import CurrencySelector from "../../components/CurrencySelector";
import CurrencyChart from "../../components/CurrencyChart";
import CurrencyGrid from "../../components/CurrencyGrid";

export default function CurrencyConversion(): JSX.Element {
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

    // Initialize selected currencies from localStorage on mount
    useEffect(() => {
        const currencies = ['USD', 'CAD', 'EUR'];
        const initialSelected = currencies.filter(currency =>
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
    return (
        <Container>
            <Navbar />
            <Grid container direction="column" spacing={3}>
                <Grid>
                    <Grid container spacing={3}>
                        <Grid>
                            <Grid container direction="column" spacing={2}>
                                <Grid>
                                    <CurrencySelector currencyCode="USD" onToggle={handleCurrencyToggle} />
                                </Grid>
                                <Grid>
                                    <CurrencySelector currencyCode="CAD" onToggle={handleCurrencyToggle} />
                                </Grid>
                                <Grid>
                                    <CurrencySelector currencyCode="EUR" onToggle={handleCurrencyToggle} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <CurrencyChart
                                selectedCurrencies={selectedCurrencies}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid>
                    <CurrencyGrid selectedCurrencies={selectedCurrencies} />
                </Grid>
            </Grid>
        </Container>
    );
}