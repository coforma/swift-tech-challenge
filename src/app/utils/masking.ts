export const noDataAvailable = "--";

/**
 * Converts a number to a comma-separated string
 * @param {Number} value
 * @returns {string}
 */
export const maskThousands = (value: number | undefined): string =>
  value ? Math.round(value).toLocaleString() : noDataAvailable;

/**
 * Converts a number to a comma-separated currency string
 * @param {Number} value
 * @returns {string}
 */
export const maskCurrency = (value: number | undefined): string =>
  value ? "$" + Math.round(value).toLocaleString() : noDataAvailable;

/**
 * Converts a float number to a percentage string
 * @param {Number} value
 * @returns {string}
 */
export const maskPercentage = (value: number | undefined): string =>
  value ? Math.round(value * 100).toString() + "%" : noDataAvailable;
