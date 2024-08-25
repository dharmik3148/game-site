/** @type {import('tailwindcss').Config} */
module.exports = {
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
        smokeWhite: "#f5f5f5",
        smokeBlack: "#2a2a2a",
        deviderGray: "#ffffff1f",
        siteBlack: "#000814",
        siteDarkBlue: "#001d3d",
        siteBlue: "#003566",
        siteDarkYellow: "#ffc300",
        siteYellow: "#ffd60a",
      },
    },
  },
  plugins: [],
};
