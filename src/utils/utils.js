// Format Amount of money with currency Symbol and digits to display
const formatAmountWithCurrency = (amount, currencySymbol = "$", digits = 2) => {
  const trimmedAbsoluteValue = Math.abs(amount).toFixed(digits);
  const currencySymbolWithSign =
    amount >= 0 ? currencySymbol : "-" + currencySymbol;

  return currencySymbolWithSign + trimmedAbsoluteValue;
};

// Generate Unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 100000);
};

export const utils = { formatAmountWithCurrency, generateUniqueId };
