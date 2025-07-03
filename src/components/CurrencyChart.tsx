import { useEffect, useRef, useState } from 'react';
import { Box, Divider, Grid, Typography, useColorScheme, Skeleton, CircularProgress, Paper } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import React from 'react';
import CurrencyData from '../types/CurrencyData';

Chart.register(...registerables);

interface CurrencyChartProps {
    currencyData: Array<CurrencyData>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export default function CurrencyChart({ currencyData, loading, setLoading }: CurrencyChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const [chartData, setChartData] = useState<any>(null);

    const { mode } = useColorScheme();

    // Process currency data into chart format
    useEffect(() => {

        if (!currencyData || currencyData.length === 0) {
            setChartData(null);
            return;
        }

        setLoading(true);

        // Generate colors for each currency
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
            '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
        ];

        const allDates = Array.from(new Set(
            currencyData.flatMap(currency => currency.rates.map(rate => rate.date))
        )).sort();

        const datasets = currencyData.map((currency, index) => {
            const data = allDates.map(date => {
                const rateData = currency.rates.find(r => r.date === date);
                return rateData ? parseFloat(rateData.rate) : null;
            });

            return {
                label: currency.code,
                data: data,
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length] + '20',
                fill: false,
                tension: 0.1,
                pointRadius: 0.5,
                pointHoverRadius: 6,
                borderWidth: 2
            };
        });

        setChartData({
            labels: allDates,
            datasets: datasets
        });

        setLoading(false);
    }, [currencyData, setLoading]);

    useEffect(() => {
        if (!canvasRef.current || !chartData) return;

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
                            color: mode === "dark" ? '#fff' : '#000'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                            color: mode === "dark" ? '#fff' : '#000'
                        },
                        ticks: { color: mode === "dark" ? '#fff' : '#000' },
                        grid: { color: mode === "dark" ? '#333' : '#ddd' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Exchange Rate',
                            color: mode === "dark" ? '#fff' : '#000'
                        },
                        ticks: { color: mode === "dark" ? '#fff' : '#000' },
                        grid: { color: mode === "dark" ? '#333' : '#ddd' }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartData, mode]);

    if (loading) {
        return (
            <Box sx={{
                width: '100%',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    // Show message when no data
    if (!chartData || currencyData.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography>Select currencies to view chart</Typography>
            </Box>
        );
    }

    return (
        <Grid container direction="column">
            <Grid>
                <Box sx={{ height: 400, width: '100%' }}>
                    <canvas ref={canvasRef} />
                </Box>
            </Grid>
        </Grid>
    );
}