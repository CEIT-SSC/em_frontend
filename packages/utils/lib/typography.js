"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digitsToHindi = digitsToHindi;
exports.digitsToLatin = digitsToLatin;
exports.moneyFormat = moneyFormat;
exports.rialFormat = rialFormat;
exports.tomanFormat = tomanFormat;
/**
 * Convert English digits to Hindi (Persian) digits
 * @param input - String or number to convert
 * @returns String with Hindi digits
 */
function digitsToHindi(input) {
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const hindiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const str = input.toString();
    let result = str;
    for (let i = 0; i < englishDigits.length; i++) {
        result = result.replace(new RegExp(englishDigits[i], "g"), hindiDigits[i]);
    }
    return result;
}
/**
 * Convert Hindi (Persian) digits to Latin (English) digits
 * @param input - String to convert
 * @returns String with Latin digits
 */
function digitsToLatin(input) {
    const hindiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let result = input;
    for (let i = 0; i < hindiDigits.length; i++) {
        result = result.replace(new RegExp(hindiDigits[i], "g"), englishDigits[i]);
    }
    return result;
}
/**
 * Format numbers with comma separators (e.g., 1,234,567)
 * @param input - Number or string to format
 * @returns Formatted string with commas
 */
function moneyFormat(input) {
    const num = typeof input === "string" ? parseFloat(input) : input;
    if (isNaN(num)) {
        return input.toString();
    }
    return num.toLocaleString("en-US");
}
/**
 * Format numbers as Rial currency
 * @param input - Number or string to format
 * @param withUnit - Whether to include "ریال" unit
 * @returns Formatted string with Rial formatting
 */
function rialFormat(input, withUnit = true) {
    const formatted = moneyFormat(input);
    return withUnit ? `${formatted} ریال` : formatted;
}
/**
 * Format numbers as Toman currency (divide by 10 and format)
 * @param input - Number or string to format (in Rial)
 * @param withUnit - Whether to include "تومان" unit
 * @returns Formatted string with Toman formatting
 */
function tomanFormat(input, withUnit = false) {
    const num = typeof input === "string" ? parseFloat(input) : input;
    if (isNaN(num)) {
        return input.toString();
    }
    const tomanValue = num / 10;
    const formatted = moneyFormat(tomanValue);
    return withUnit ? `${formatted} تومان` : formatted;
}
