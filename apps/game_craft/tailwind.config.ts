import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        estedad: ["Estedad", "sans-serif"],
        vazirmatn: ["Vazirmatn", "sans-serif"],
        "iran-yekan": ["IRANYekanX", "sans-serif"],
        "sf-pro": ["SF Pro Rounded", "sans-serif"],
      },
      colors: {
        // Your custom brand colors
        primary: "#3c3a7d",
        action: "#01B582",
        "offline-workshop": "#4F7B79",

        // Ant Design theme colors extracted from provider
        "antd-primary": "#3c3a7d",
        "antd-primary-hover": "#4c4a8d",
        "antd-primary-active": "#2c2a6d",
        "antd-success": "#01B582",
        "antd-warning": "#faad14",
        "antd-error": "#ff4d4f",

        // Light theme colors
        "antd-bg-base": "#ffffff",
        "antd-bg-container": "#ffffff",
        "antd-bg-elevated": "#ffffff",
        "antd-text": "#000000d9",
        "antd-text-secondary": "#00000073",
        "antd-layout-header": "#3c3a7d",
        "antd-layout-body": "#f5f5f5",

        // Dark theme colors
        "antd-dark-bg-base": "#1E1E1E",
        "antd-dark-bg-container": "#262626",
        "antd-dark-bg-elevated": "#2a2a2a",
        "antd-dark-text": "#ffffffd9",
        "antd-dark-text-secondary": "#ffffff73",
        "antd-dark-layout-header": "#3c3a7d",
        "antd-dark-layout-body": "#1E1E1E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
  corePlugins: {
    preflight: false, // Disable to avoid conflicts with Ant Design
  },
};

export default config;
