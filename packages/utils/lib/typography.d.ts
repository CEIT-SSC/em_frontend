/**
 * Convert English digits to Hindi (Persian) digits
 * @param input - String or number to convert
 * @returns String with Hindi digits
 */
export declare function digitsToHindi(input: string | number): string;
/**
 * Convert Hindi (Persian) digits to Latin (English) digits
 * @param input - String to convert
 * @returns String with Latin digits
 */
export declare function digitsToLatin(input: string): string;
/**
 * Format numbers with comma separators (e.g., 1,234,567)
 * @param input - Number or string to format
 * @returns Formatted string with commas
 */
export declare function moneyFormat(input: string | number): string;
/**
 * Format numbers as Rial currency
 * @param input - Number or string to format
 * @param withUnit - Whether to include "ریال" unit
 * @returns Formatted string with Rial formatting
 */
export declare function rialFormat(input: string | number, withUnit?: boolean): string;
/**
 * Format numbers as Toman currency (divide by 10 and format)
 * @param input - Number or string to format (in Rial)
 * @param withUnit - Whether to include "تومان" unit
 * @returns Formatted string with Toman formatting
 */
export declare function tomanFormat(input: string | number, withUnit?: boolean): string;
