const formatAmount = (value) => {
  return value >= 0 ? "$" + value : "-$" + Math.abs(value);
};

export const utils = { formatAmount };
