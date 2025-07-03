export default interface CurrencyData {
    code: string;
    rates: Array<{
        rate: string;
        date: string;
    }>
}

