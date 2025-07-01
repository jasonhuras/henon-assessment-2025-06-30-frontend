import { useEffect, useRef, useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import React from 'react';

Chart.register(...registerables);

interface CurrencyChartProps {
    selectedCurrencies: string[];
    loading: boolean;
    isDarkMode: boolean;
}

export default function CurrencyChart({ selectedCurrencies, loading, isDarkMode }: CurrencyChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const [chartData, setChartData] = useState<any>(null);

    const timeframes = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '2Y'];

    // Update chart data when selected currencies change
    useEffect(() => {
        if (selectedCurrencies.length === 0) {
            setChartData(null);
            return;
        }

        // TODO: Replace with actual data fetching
        const mockData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: selectedCurrencies.map((currency, index) => ({
                label: currency,
                data: [65, 59, 80, 81, 56, 55], // Placeholder data
                borderColor: ['#2196f3', '#4caf50', '#ff9800'][index],
                backgroundColor: ['#2196f3', '#4caf50', '#ff9800'][index] + '20',
                tension: 0.4
            }))
        };

        setChartData(mockData);
    }, [selectedCurrencies]);

    // Create/update chart when data changes
    useEffect(() => {
        if (!canvasRef.current || !chartData) return;

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: isDarkMode ? '#fff' : '#000'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: isDarkMode ? '#fff' : '#000' },
                        grid: { color: isDarkMode ? '#333' : '#ddd' }
                    },
                    y: {
                        ticks: { color: isDarkMode ? '#fff' : '#000' },
                        grid: { color: isDarkMode ? '#333' : '#ddd' }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartData, isDarkMode]);

    if (!chartData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography>Select currencies to view chart</Typography>
            </Box>
        );
    }

    const handleClick = (timeframe: string) => {
        console.log(timeframe)
    };

    return (
        <Grid container direction="column">
            <Grid>
                <canvas ref={canvasRef} />
            </Grid>
            <Grid>
                <Grid container spacing={3}>
                    {timeframes.map((label, index) => (
                        <Grid>
                            <Typography
                                variant="overline"
                                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                                onClick={() => handleClick(label)}
                            >
                                {label}
                            </Typography>
                        </Grid>
                    ))}
                    <Grid>
                        <Typography variant="overline">Custom</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );
}