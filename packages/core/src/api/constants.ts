import isProduction from "../utils/isProduction";

const localhost = "https://aut-ssc.ir";
export const BASE_URL = isProduction() ? process.env.BASE_URL : localhost;
