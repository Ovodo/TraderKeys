import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        appYellow: "#E9C46A",
        appCream: "#faedcd",
        appRed: "#F4A261",
        appOrange: "#E76F51",
        appBlue: "#264653",
        appGreen: "#2A9D8F",
      },
    },
  },
  plugins: [],
};
export default config;
