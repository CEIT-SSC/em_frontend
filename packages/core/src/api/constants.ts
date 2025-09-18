import isProduction from "../utils/isProduction";

const localhost = "https://api.ceit-ssc.ir";
export const BASE_URL = isProduction()
  ? process.env.BASE_URL ?? "https://api.ceit-ssc.ir"
  : localhost;
