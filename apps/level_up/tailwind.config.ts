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
        primary: "#0056D2", // Bright blue
        action: "#00C897", // Fresh green accent
        "offline-workshop": "#4E6E81", // Muted teal

        // Ant Design theme colors extracted from provider
        "antd-primary": "#0056D2",
        "antd-primary-hover": "#1E6DEB",
        "antd-primary-active": "#0041A8",
        "antd-success": "#00C897",
        "antd-warning": "#FFC93C",
        "antd-error": "#FF5A5F",

        // Light theme colors
        "antd-bg-base": "#ffffff",
        "antd-bg-container": "#f9fafb",
        "antd-bg-elevated": "#ffffff",
        "antd-text": "#1a1a1a",
        "antd-text-secondary": "#4b5563",
        "antd-layout-header": "#0056D2",
        "antd-layout-body": "#f4f6f8",

        // Dark theme colors
        "antd-dark-bg-base": "#0F172A",
        "antd-dark-bg-container": "#1E293B",
        "antd-dark-bg-elevated": "#27364A",
        "antd-dark-text": "#F8FAFC",
        "antd-dark-text-secondary": "#CBD5E1",
        "antd-dark-layout-header": "#0056D2",
        "antd-dark-layout-body": "#0F172A",
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
