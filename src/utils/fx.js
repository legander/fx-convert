import { DEFAULT_BASE_CURRENCY } from "../constants";


export const getCurrencyCodes = (currencies = []) => currencies.map(({ code }) => code);

export const calculateAmount = ({ fromRate, toRate, amount: amountInSek }) => {
  return Number(amountInSek) * (1 / fromRate) * toRate;
};

export const getCalculatedAmounts = ({ rates = [], amount }) =>
  Object.entries(rates)
    .map(([symbol, rate]) => ({
      code: symbol,
      amount: calculateAmount({
        fromRate: rates[DEFAULT_BASE_CURRENCY],
        toRate: rate,
        amount
      })
    }))
    .filter(({ code }) => code !== DEFAULT_BASE_CURRENCY);
