/**
 * Converts the first letter of each word in a given string to uppercase
 * while ensuring the rest of the letters are in lowercase.
 *
 * @param str - The input string to be transformed.
 * @returns A new string with each word's first letter capitalized.
 */
export function firstLetterUppercase(str: string): string {
  const valueString = str.toLowerCase();
  return valueString
    .split(' ')
    .map(
      (value: string) =>
        `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`
    )
    .join(' ');
}

/**
 * Converts a given string to lowercase.
 *
 * @param str - The string to be converted to lowercase.
 * @returns The lowercase version of the input string.
 */
export function lowerCase(str: string): string {
  return str ? str?.toLowerCase() : str;
}

/**
 * Converts a given string to uppercase.
 *
 * @param str - The string to be converted.
 * @returns The uppercase version of the input string, or the original string if it is empty.
 */
export const toUpperCase = (str: string): string => {
  return str ? str.toUpperCase() : str;
};

/**
 * Checks if the provided string is a valid email address.
 *
 * @param email - The string to be validated as an email address.
 * @returns True if the string is a valid email address, false otherwise.
 */
export function isEmail(email: string): boolean {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
}

/**
 * Checks if a given string is a valid data URL.
 *
 * A data URL is a URI scheme that provides a way to include data in-line in web pages.
 * This function uses a regular expression to validate the format of the data URL.
 *
 * @param value - The string to be checked.
 * @returns True if the string is a valid data URL, false otherwise.
 */
export function isDataURL(value: string): boolean {
  const dataUrlRegex =
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i;
  return dataUrlRegex.test(value);
}
