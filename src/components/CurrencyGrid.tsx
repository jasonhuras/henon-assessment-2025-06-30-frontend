import React, { useState, useEffect, useMemo, useCallback, StrictMode } from 'react';
import { Typography, Box, useColorScheme, Paper, useTheme } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, colorSchemeLightWarm, colorSchemeDarkWarm, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import CurrencyData from '../types/CurrencyData';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface CurrencyGridProps {
    currencyData: Array<CurrencyData>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

interface FlattenedCurrencyData {
    code: string;
    rate: number;
    date: string;
    rateChangePercent?: number;
}

export default function CurrencyGrid({ currencyData, loading, setLoading }: CurrencyGridProps) {
    const { mode } = useColorScheme();
    const MUItheme = useTheme();

    const rowData = useMemo(() => {
        setLoading(true);
        const flattened: FlattenedCurrencyData[] = [];

        currencyData.forEach(currency => {
            currency.rates.forEach((rateData, index) => {
                const rate = parseFloat(rateData.rate);

                let rateChangePercent = 0;
                let rateChange = 0;

                if (index > 0) {
                    const prevRate = parseFloat(currency.rates[index - 1].rate);
                    rateChange = rate - prevRate;
                    rateChangePercent = (rateChange / prevRate) * 100;
                }

                flattened.push({
                    code: currency.code,
                    rate: rate,
                    date: rateData.date,
                    rateChangePercent: index > 0 ? rateChangePercent : undefined
                });
            });
        });
        setLoading(false);
        return flattened.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [currencyData, setLoading]);


    const columnDefs = [
        {
            headerName: 'Currency Code',
            field: 'code' as keyof FlattenedCurrencyData,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: 'Exchange Rate',
            field: 'rate' as keyof FlattenedCurrencyData,
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => params.value?.toFixed(4),
        },
        {
            headerName: 'Date',
            field: 'date' as keyof FlattenedCurrencyData,
            filter: 'agDateColumnFilter',

        },
        {
            headerName: 'Change %',
            field: 'rateChangePercent' as keyof FlattenedCurrencyData,
            type: 'numericColumn',
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => params.value?.toFixed(4),
        }
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: true,
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
    };

    const theme = themeMaterial
        .withParams(
            {
                browserColorScheme: "light",
                headerBackgroundColor: MUItheme.palette.primary.main,
                backgroundColor: MUItheme.palette.background.default,
                foregroundColor: MUItheme.palette.text.primary,
                headerTextColor: MUItheme.palette.text.primary,
            },
            "light",
        )
        .withParams(
            {
                browserColorScheme: "dark",
                headerBackgroundColor: MUItheme.palette.primary.main,
                backgroundColor: MUItheme.palette.background.default,
                foregroundColor: MUItheme.palette.text.primary,
                headerTextColor: MUItheme.palette.text.primary,
            },
            "dark",
        );


    useEffect(() => {
        document.body.dataset.agThemeMode = mode;
    }, [mode]);

    return (
        <Paper elevation={20}>
            <div style={{ width: "100%", height: "500px" }}>
                <AgGridReact
                    theme={theme}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    loading={loading}
                    rowSelection="multiple"
                    cellSelection={true}
                    enableCharts={true}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={20}
                    paginationPageSizeSelector={[25, 50, 100, 200]}
                />
            </div>
        </Paper>
    );
}