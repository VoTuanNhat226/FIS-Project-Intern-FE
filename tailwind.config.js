/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}", // Bao gồm các file HTML và TypeScript trong thư mục src
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#f2721e',
        'custom-text': '#024fa0',
        'header-bg': '#9A0011'
      },
    },
  },
  plugins: [],
};


