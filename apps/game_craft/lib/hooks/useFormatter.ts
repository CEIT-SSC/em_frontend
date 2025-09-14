"use client";

import { digitsToHindi, moneyFormat } from "@ssc/utils";
import { useLocale } from "next-intl";

export const useFormatter = () => {
  const locale = useLocale();

  const formatNumberToMoney = (value: string | number) => {
    const formatted = moneyFormat(value);
    return locale === "fa" ? digitsToHindi(formatted) : formatted;
  };

  return { formatNumberToMoney };
};
