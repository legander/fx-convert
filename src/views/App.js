import React, { Component } from "react";
import { debounce } from "lodash-es";

import { DEFAULT_BASE_CURRENCY } from "../constants";
import { apiClient, createLoadingManager, getCalculatedAmounts, getCurrencyCodes } from "../utils/";
import { CountryList, CountryCard, AsyncInput, ResultView, ResultViewItem } from "../components/";
import { InputRow, CenterLayout, ErrorMessage } from "../components/generic/";


const INITIAL_STATE = {
  countries: [],
  error: null,
  amount: "",
  countryName: "",
  selectedCountry: null,
  fromSymbol: "SEK",
  currencySymbols: [],
  calculatedAmounts: [],
  isLoadingRates: false,
  isLoadingCountries: false
};

class App extends Component {
  state = { ...INITIAL_STATE };

  loadingManager = createLoadingManager(this.setState.bind(this));

  doSearchContry = debounce(() => {
    const { countryName } = this.state;

    if (countryName.length > 2) {
      this.loadingManager("isLoadingCountries", apiClient.searchCountryByName(countryName))
        .then(countries =>
          this.setState({
            countries,
            error: INITIAL_STATE.error
          })
        )
        .catch(({ status, message }) =>
          this.setState({
            error: status === 404 ? `No country found with name: ${countryName}` : message,
            selectedCountry: INITIAL_STATE.selectedCountry,
            countries: INITIAL_STATE.countries
          })
        );
    } else if (countryName.length === 0) {
      this.setState(() => ({
        countries: INITIAL_STATE.countries,
        selectedCountry: INITIAL_STATE.selectedCountry,
        calculatedAmounts: INITIAL_STATE.calculatedAmounts
      }));
    }
  }, 300);

  getConversionRates = () => {
    const payload = { symbols: [DEFAULT_BASE_CURRENCY, ...this.state.currencySymbols] };

    return this.loadingManager("isLoadingRates", apiClient.getExchangeRate(payload))
      .then(rates => this.setState({ rates }, this.calculateAmounts))
      .catch(({ message }) =>
        this.setState({
          ...INITIAL_STATE,
          error: message
        })
      );
  };

  calculateAmounts = () =>
    this.setState(({ rates, amount }) => ({
      calculatedAmounts: getCalculatedAmounts({ rates, amount })
    }));
  
  onAmountChange = ({ target }) =>
    this.setState({ amount: target.value }, this.calculateAmounts);

  onCountryNameChange = ({ target }) =>
    this.setState({
      error: INITIAL_STATE.error,
      countryName: target.value
    }, this.doSearchContry);

  onSelectCountry = country => () =>
    this.setState({
      selectedCountry: country,
      countryName: country.name,
      countries: INITIAL_STATE.countries,
      calculatedAmounts: INITIAL_STATE.calculatedAmounts,
      currencySymbols: getCurrencyCodes(country.currencies)
    }, this.getConversionRates);

  render() {
    const {
      isLoadingCountries,
      isLoadingRates,
      selectedCountry,
      calculatedAmounts,
      fromSymbol,
      amount,
      error
    } = this.state;

    return (
      <div>
        <CenterLayout>
          <InputRow>
            <AsyncInput
              className="country-field"
              isLoading={isLoadingCountries}
              type="text"
              placeholder="Search for country"
              value={this.state.countryName}
              onChange={this.onCountryNameChange}
            />
            <AsyncInput
              className="amount-field"
              type="number"
              placeholder={`Amount in ${fromSymbol}`}
              isLoading={isLoadingRates}
              value={amount}
              onChange={this.onAmountChange}
            />
          </InputRow>

          {selectedCountry && (
            <>
              <CountryCard country={selectedCountry} />
              <ResultView list={calculatedAmounts}>
                <ResultViewItem amount={amount} code={fromSymbol} highlight />
              </ResultView>
            </>
          )}
          <CountryList list={this.state.countries} onSelect={this.onSelectCountry} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </CenterLayout>
      </div>
    );
  }
}

export default App;
