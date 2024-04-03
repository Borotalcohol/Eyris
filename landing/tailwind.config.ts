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
        accent: "#1ED760",
        purple: "#E6A9FB",
        ochre: "#FBE9A9",
        gray: "#2D2D2D",
        "dark-gray": "#212121",
        "darkest-gray": "#131313",
      },
    },
  },
  plugins: [],
};
export default config;
