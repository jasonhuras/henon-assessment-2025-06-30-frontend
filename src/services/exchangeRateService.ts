export interface ExchangeRateRequest {
  base_currency_code: string;
  target_currency_code: string;
  start_date: Date;
  end_date: Date;
}

export interface ExchangeRateResponse {
  rates: Array<{
    date: string;
    rate: number;
  }>;
}

export interface SupportedCurrenciesResponse {
  data: {
    pairs: Array<{
      code: string;
      name: string;
    }>;
  }
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export class ExchangeRateService {
  static async getExchangeRates(params: ExchangeRateRequest): Promise<ExchangeRateResponse> {
    const queryParams = new URLSearchParams({
      base_currency_code: params.base_currency_code,
      target_currency_code: params.target_currency_code,
      start_date: params.start_date.toDateString(),
      end_date: params.end_date.toDateString(),
    });

    const response = await fetch(`${API_BASE_URL}/exchange-rates/?${queryParams}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    return response.json();
  }

  static async getSupportedCurrencies(): Promise<SupportedCurrenciesResponse> {
    const response = await fetch(`${API_BASE_URL}/supported-currencies/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch supported currencies: ${response.statusText}`);
    }

    return response.json();
  }
}