/**
 * Converts a number to a comma separated value
 * @param {Number} value
 * @returns {string}
 */
export function convertToThousandsSeparatedString(value: number): string {
  let maskValue = "";
  maskValue = Math.round(value).toLocaleString();

  return maskValue;
}

/**
 * Converts a float number to a percentage string
 * @param {Number} value
 * @returns {string}
 */
export function convertPercentage(value: number): string {
  let maskValue = value * 100;
  maskValue = Math.round(maskValue);

  return maskValue.toString();
}
