import Currency from './Currency'

export default interface CurrencySelectionDialogProps {
    open: boolean;
    onClose: () => void;
    currencies: Currency[];
    selectedCurrencies: string[];
    onCurrencyToggle: (currencyCode: string, isSelected: boolean) => void;
}