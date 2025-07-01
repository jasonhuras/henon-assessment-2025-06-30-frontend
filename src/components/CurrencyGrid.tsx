import { Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


interface CurrencyGridProps {
    selectedCurrencies: string[];
    loading: boolean;
    isDarkMode: boolean;
}

export default function CurrencyGrid({ selectedCurrencies, loading, isDarkMode }: CurrencyGridProps) {

    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<any>([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>

    )
}