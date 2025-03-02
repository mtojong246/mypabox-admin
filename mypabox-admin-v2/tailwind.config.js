/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Noto Sans': ["Noto Sans", "sans-serif"]
      },
      colors: {
        'default': '#252628',
        'warning': '#F06A6A',
        'success': '#4FC769',
        'primary': '#4573D2',
        'outline': '#D9D9D9',
        'placeholder': '#A2A0A2',
      }
    },
  },
  plugins: [],
};
