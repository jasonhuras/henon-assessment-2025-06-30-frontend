import React, { useState } from 'react';
import {
    IconButton,
    Popover,
    Box,
    Grid,
    Typography,
    Tooltip,
    Paper
} from '@mui/material';
import { Palette } from '@mui/icons-material';
import { useThemeColor } from '../themes/ThemeContext';

const PRESET_COLORS = [
    { name: 'Green', value: '#99C33C' },
    { name: 'Blue', value: '#2196F3' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Orange', value: '#FF9800' },
    { name: 'Red', value: '#F44336' },
    { name: 'Teal', value: '#009688' },
    { name: 'Pink', value: '#E91E63' },
    { name: 'Indigo', value: '#3F51B5' },
    { name: 'Cyan', value: '#00BCD4' },
    { name: 'Deep Purple', value: '#673AB7' },
    { name: 'Amber', value: '#FFC107' },
    { name: 'Deep Orange', value: '#FF5722' },
];

export default function ColorWheel() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { primaryColor, setPrimaryColor } = useThemeColor();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorSelect = (color: string) => {
        setPrimaryColor(color);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'color-wheel-popover' : undefined;

    return (
        <>
            <Tooltip title="Change theme color" arrow>
                <IconButton
                    onClick={handleClick}
                    sx={{
                        color: 'text.primary',
                        position: 'relative',
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    }}
                    aria-label="change theme color"
                >
                    <Palette />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper sx={{ p: 2, maxWidth: 240 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        Choose Theme Color
                    </Typography>
                    <Grid container spacing={1}>
                        {PRESET_COLORS.map((color) => (
                            <Grid key={color.value}>
                                <Tooltip title={color.name} arrow>
                                    <Box
                                        onClick={() => handleColorSelect(color.value)}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: color.value,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            transition: 'all 0.2s ease',
                                            border: '2px solid',
                                            borderColor: primaryColor === color.value ? 'text.primary' : 'transparent',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                            },
                                            '&::after': primaryColor === color.value ? {
                                                content: '\"✓\"',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                            } : {}
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Color preference is saved automatically
                    </Typography>
                </Paper>
            </Popover>
        </>
    );
}