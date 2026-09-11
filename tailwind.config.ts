import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // اگر از پوشه src استفاده می‌کنی، این یک خط جادویی تمام زیرپوشه‌ها را پوشش می‌دهد:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // اگر احیاناً فولدری بیرون از src داری (مثل templates یا components در ریشه پروژه):
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
