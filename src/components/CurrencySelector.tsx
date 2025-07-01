import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState, useEffect } from "react";
import CurrencySelectorProps from "../types/CurrencySelectorPropts";

export default function CurrencySelector({ currencyCode, onToggle }: CurrencySelectorProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`currency_${currencyCode}`);
        setIsSelected(saved === 'true');
    }, [currencyCode]);

    const handleToggle = () => {
        const newState = !isSelected;
        setIsSelected(newState);
        onToggle?.(currencyCode, newState);
    };

    return (
        <Button
            onClick={handleToggle}
            variant={isSelected ? undefined : undefined}
            color={isSelected ? "error" : "primary"}
            startIcon={isSelected ? <Remove /> : <Add />}
            sx={{
                opacity: isSelected ? 1 : 0.6,
                '&:hover': {
                    opacity: 1
                }
            }}
        >
            {currencyCode}
        </Button>
    );
}