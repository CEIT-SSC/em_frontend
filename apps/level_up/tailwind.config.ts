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
        primary: "#4B164C",
        action: "#E83E8C",
        "offline-workshop": "#5C4D7D",

        "antd-primary": "#4B164C",
        "antd-primary-hover": "#662566",
        "antd-primary-active": "#351034",
        "antd-success": "#22C55E",
        "antd-warning": "#FACC15",
        "antd-error": "#F43F5E",

        "antd-bg-base": "#FFFFFF",
        "antd-bg-container": "#F9F7FB",
        "antd-bg-elevated": "#FFFFFF",
        "antd-text": "#1E1B1B",
        "antd-text-secondary": "#575369",
        "antd-layout-header": "#4B164C",
        "antd-layout-body": "#F6F4F9",

        "antd-dark-bg-base": "#130E15",
        "antd-dark-bg-container": "#1F1825",
        "antd-dark-bg-elevated": "#2B1F36",
        "antd-dark-text": "#F8FAFC",
        "antd-dark-text-secondary": "#A1A1AA",
        "antd-dark-layout-header": "#4B164C",
        "antd-dark-layout-body": "#130E15",
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
