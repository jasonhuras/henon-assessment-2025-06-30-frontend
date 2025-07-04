import CurrencyData from "../types/CurrencyData";

export interface ExchangeRateRequest {
  base_currency_code: string;
  target_currency_code: string;
  start_date: Date;
  end_date: Date;
}

export interface ExchangeRateResponse {
  data: Array<CurrencyData>;
}

export interface SupportedCurrenciesResponse {
  data: {
    pairs: Array<{
      code: string;
      name: string;
    }>;
  }
}

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export class ExchangeRateService {

  private static getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_KEY) {
      headers['X-API-Key'] = API_KEY;
    }

    return headers;
  }
  static async getExchangeRates(params: ExchangeRateRequest): Promise<ExchangeRateResponse> {
    const queryParams = new URLSearchParams({
      base_currency_code: params.base_currency_code,
      target_currency_code: params.target_currency_code,
      start_date: new Date(params.start_date.setDate(params.start_date.getDate() + 1)).toDateString(),
      end_date: params.end_date.toDateString(),
    });

    const response = await fetch(`${API_BASE_URL}/exchange-rates/?${queryParams}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    return response.json();
  }

  static async getSupportedCurrencies(): Promise<SupportedCurrenciesResponse> {
    const response = await fetch(`${API_BASE_URL}/supported-currencies/`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch supported currencies: ${response.statusText}`);
    }

    return response.json();
  }
}