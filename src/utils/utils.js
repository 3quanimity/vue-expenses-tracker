const formatAmountWithCurrency = (amount, currencySymbol = "$", digits = 2) => {
  const trimmedAbsoluteValue = Math.abs(amount).toFixed(digits);
  const currencySymbolWithSign =
    amount >= 0 ? currencySymbol : "-" + currencySymbol;

  return currencySymbolWithSign + trimmedAbsoluteValue;
};

export const utils = { formatAmountWithCurrency };
