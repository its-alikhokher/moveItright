/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66aaff',
          400: '#338eff',
          500: '#0071ff',
          600: '#005dcc',
          700: '#004499',
          800: '#002c66',
          900: '#001433',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 113, 255, 0.1), 0 2px 4px -1px rgba(0, 113, 255, 0.06)',
      },
    },
  },
  plugins: [],
}