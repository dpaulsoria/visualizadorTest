/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Rutas para archivos en la carpeta pages
    './components/**/*.{js,ts,jsx,tsx}', // Rutas para archivos en la carpeta components
    './app/**/*.{js,ts,jsx,tsx}', // Rutas para archivos en la carpeta app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
