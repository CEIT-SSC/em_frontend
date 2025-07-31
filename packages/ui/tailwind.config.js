/** @type {import('tailwindcss').Config} */
import tailwindConfig from "@ssc/tailwind-config";

export default {
  ...tailwindConfig,
  content: [
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...tailwindConfig.theme,
  },
  plugins: [],
};
