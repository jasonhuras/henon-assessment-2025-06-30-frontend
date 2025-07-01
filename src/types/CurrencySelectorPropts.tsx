export default interface CurrencySelectorProps {
    currencyCode: 'USD' | 'CAD' | 'EUR';
    onToggle: (currencyCode: string, isSelected: boolean) => void;
}