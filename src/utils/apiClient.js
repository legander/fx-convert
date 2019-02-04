import { API_ERROR_MESSAGES } from "../constants/errors";

// process.env mock
const process = {
  env: {
    FX_API_BASE_URL: "http://data.fixer.io/api",
    FX_API_TOKEN: "51db5a7ea01b26cd4580e6c371560eb3",
    COUNTRIES_API_BASE_URL: "https://restcountries.eu/rest/v2"
  }
};


const defaultParser = res => {
  // Checks that status code is in range of 200-299
  if (res.ok) {
    return res.json();
  }

  res.message =
    res.status === 404 ? API_ERROR_MESSAGES.NOT_FOUND : API_ERROR_MESSAGES.UNEXPECTED_ERROR;

  return Promise.reject(res);
};

// Common interface for app to communicate with API(s).
// Here we'll try to Homogenize error format and responses etc.
class ApiClient {
  constructor({ COUNTRIES_API_BASE_URL, FX_API_BASE_URL, FX_API_TOKEN }) {
    this.contriesApiBaseUrl = COUNTRIES_API_BASE_URL;
    this.fxApiToken = FX_API_TOKEN;
    this.fxApiBaseUrl = FX_API_BASE_URL;
  }

  // `/api/convert` endpoint not supported for free subscriptions so we'll use `/latest` instead.
  getExchangeRate({ symbols }) {
    return fetch(
      `${this.fxApiBaseUrl}/latest?access_key=${this.fxApiToken}&symbols=${symbols.join(",")}`,
      {
        method: "GET"
      }
    )
      .then(defaultParser)
      .then(data => data.rates);
  }

  // Filter out null entries
  // example response below
  // [
  //   { "code": "BWP", ... },
  //   { "code": "GBP", ... },
  //   {
  //     "code": "(none)",
  //     "name": null,
  //     "symbol": null
  //   }
  // ]
  searchCountryByName(name = "") {
    return fetch(`${this.contriesApiBaseUrl}/name/${name}`, { method: "GET" })
      .then(defaultParser)
      .then(countries =>
        countries.map(country => ({
          ...country,
          currencies: country.currencies.filter(currency => currency.name !== null)
        }))
      );
  }
}

export const apiClient = new ApiClient({
  FX_API_BASE_URL: process.env.FX_API_BASE_URL,
  FX_API_TOKEN: process.env.FX_API_TOKEN,
  COUNTRIES_API_BASE_URL: process.env.COUNTRIES_API_BASE_URL
});
