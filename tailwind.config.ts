import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paraspect: {
          ink: "#1B1F3B",
          sky: "#5CC8FF",
          sun: "#FFD166",
          mint: "#06D6A0",
          coral: "#EF476F",
          cloud: "#F6F7FB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
