import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useColorScheme, Paper, useTheme, Box, Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
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

const GRID_STATE_KEY = 'currency-grid-state';

export default function CurrencyGrid({ currencyData, loading, setLoading }: CurrencyGridProps) {
    const { mode } = useColorScheme();
    const MUItheme = useTheme();
    const gridRef = useRef<AgGridReact>(null);

    const rowData = useMemo(() => {
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
        return flattened.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [currencyData]);

    // Save grid state to localStorage
    const saveGridState = useCallback(() => {
        if (!gridRef.current?.api) return;

        const gridState = {
            columnState: gridRef.current.api.getColumnState(),
            filterModel: gridRef.current.api.getFilterModel(),
        };

        try {
            localStorage.setItem(GRID_STATE_KEY, JSON.stringify(gridState));
        } catch (error) {
            console.warn('Failed to save grid state:', error);
        }
    }, []);

    // Load grid state from localStorage
    const loadGridState = useCallback(() => {
        if (!gridRef.current?.api) return;

        try {
            const savedState = localStorage.getItem(GRID_STATE_KEY);
            if (!savedState) return;

            const gridState = JSON.parse(savedState);

            if (gridState.columnState) {
                gridRef.current.api.applyColumnState({
                    state: gridState.columnState,
                    applyOrder: true,
                });
            }

            if (gridState.filterModel) {
                gridRef.current.api.setFilterModel(gridState.filterModel);
            }

        } catch (error) {
            console.warn('Failed to load grid state:', error);
        }
    }, []);


    // Event handlers for state persistence
    const onGridReady = useCallback(() => {
        loadGridState();
    }, [loadGridState]);

    const onFilterChanged = useCallback(() => {
        saveGridState();
    }, [saveGridState]);

    const onSortChanged = useCallback(() => {
        saveGridState();
    }, [saveGridState]);

    const onColumnResized = useCallback(() => {
        saveGridState();
    }, [saveGridState]);

    const onColumnMoved = useCallback(() => {
        saveGridState();
    }, [saveGridState]);

    const onColumnVisible = useCallback(() => {
        saveGridState();
    }, [saveGridState]);

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

    if (currencyData.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={500}>
                <Typography>Select a currency to view data grid</Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={20}>
            <div style={{ width: "100%", height: "500px" }}>
                <AgGridReact
                    ref={gridRef}
                    theme={theme}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    loading={loading}
                    pagination={true}
                    paginationPageSize={20}
                    paginationPageSizeSelector={[20, 50, 100, 200]}
                    onGridReady={onGridReady}
                    onFilterChanged={onFilterChanged}
                    onSortChanged={onSortChanged}
                    onColumnResized={onColumnResized}
                    onColumnMoved={onColumnMoved}
                    onColumnVisible={onColumnVisible}
                />
            </div>
        </Paper>
    );
}