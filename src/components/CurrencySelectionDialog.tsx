import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Box,
    Grid,
    Paper,
    FormControlLabel,
    Checkbox,
    Pagination,
    TextField,
    InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';
import Currency from '../types/Currency';

const ITEMS_PER_PAGE = 10;

interface CurrencySelectionDialogProps {
    open: boolean;
    onClose: () => void;
    currencies: Currency[];
    selectedCurrencies: string[];
    onCurrencyToggle: (currencyCode: string, isSelected: boolean) => void;
}

export default function CurrencySelectionDialog({
    open,
    onClose,
    currencies,
    selectedCurrencies,
    onCurrencyToggle,
}: CurrencySelectionDialogProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
    const [sortedCurrencies, setSortedCurrencies] = useState<Currency[]>([]);

    // Sort currencies only when dialog opens
    useEffect(() => {
        if (open && currencies.length > 0) {
            const sorted = [...currencies].sort((a, b) => {
                const aSelected = selectedCurrencies.includes(a.code);
                const bSelected = selectedCurrencies.includes(b.code);

                // selected comes first
                if (aSelected !== bSelected) {
                    return aSelected ? -1 : 1;
                }

                // then sort alphabetically by code
                return a.code.localeCompare(b.code);
            });
            setSortedCurrencies(sorted);
        }
    }, [open, currencies]);

    // Filter sorted currencies based on search term (no re-sorting)
    useEffect(() => {
        let filtered = sortedCurrencies;

        // Apply search filter
        if (searchTerm) {
            filtered = sortedCurrencies.filter(
                currency =>
                    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredCurrencies(filtered);
        setCurrentPage(1);
    }, [sortedCurrencies, searchTerm]);

    // pagination
    const totalPages = Math.ceil(filteredCurrencies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCurrencies = filteredCurrencies.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleClose = () => {
        setSearchTerm('');
        setCurrentPage(1);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    Select Currencies
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Choose from available currency pairs to track their exchange rates
                </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ py: 2 }}>
                <Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search currencies..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {filteredCurrencies.length} currency pairs available
                        {searchTerm && ` (filtered from ${currencies.length})`}
                    </Typography>

                    {paginatedCurrencies.length > 0 ? (
                        <Grid container spacing={1}>
                            {paginatedCurrencies.map((currency, index) => (
                                <Grid key={currency.code}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 1.5,
                                            pr: 3,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCurrencies.includes(currency.code)}
                                                    onChange={(event) => onCurrencyToggle(currency.code, event.target.checked)}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 20 },
                                                        mr: 1
                                                    }}
                                                />
                                            }
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                                                            {currency.code}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {currency.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            }
                                            sx={{
                                                margin: 0,
                                                width: '100%',
                                                '& .MuiFormControlLabel-label': {
                                                    width: '100%'
                                                }
                                            }}
                                        />
                                    </Paper>
                                    {index < paginatedCurrencies.length - 1 && (
                                        <Divider sx={{ my: 1 }} />
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                            <Typography variant="body2" color="text.secondary">
                                No currencies found matching "{searchTerm}"
                            </Typography>
                        </Box>
                    )}

                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="small"
                            />
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        {selectedCurrencies.length} currencies selected
                    </Typography>
                    <Button
                        onClick={handleClose}
                        size="small"
                    >
                        Done
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}