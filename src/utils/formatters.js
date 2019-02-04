export const currencyFormatter = num =>
  Number(num)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const numberPrefixFormatter = num => num;

export const commaSeparatedList = (list = []) =>
  list.map((item, i) => (i === list.length -1 ? item : `${item}, `));
