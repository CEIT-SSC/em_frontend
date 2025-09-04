export const digitsToHindi = (input: string | number): string => {
  const hindiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .split("")
    .map((char) => (/\d/.test(char) ? hindiDigits[parseInt(char, 10)] : char))
    .join("");
};

export const digitsToLatin = (input: string): string => {
  const latinDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return input
    .split("")
    .map((char) =>
      /[۰-۹]/.test(char) ? latinDigits["۰۱۲۳۴۵۶۷۸۹".indexOf(char)] : char
    )
    .join("");
};
